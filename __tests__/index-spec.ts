import { async, fakeAsync, tick, inject, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';
import { Storage } from '@ionic/storage';
import { CachedGet, CachedGetModule } from '../src/';
import 'rxjs/add/operator/map';

describe('CachedGet', () => {
  const storageStub = {
    get: (key: string): Promise<any> => {
      if (key === 'http://localhost/storage-error')
        return Promise.reject(new Error('StorageError'));
      return Promise.resolve(window.localStorage.getItem(key));
    },
    set: (key: string, value: any): Promise<any> => Promise.resolve(window.localStorage.setItem(key, value)),
    clear: (): Promise<void> => Promise.resolve(window.localStorage.clear()),
    ready: (): Promise<void> => Promise.resolve()
  };
  let injector: TestBed;
  let cg: CachedGet;
  let htc: HttpTestingController;

  beforeAll(() => {
    window.localStorage.clear();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CachedGetModule.forRoot()
      ],
      providers: [{ provide: Storage, useValue: storageStub }],
    });
    injector = getTestBed();
    cg = injector.get(CachedGet);
    htc = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    htc.verify();
  });

  it('should be defined', () => {
    expect(cg).toBeDefined();
  });

  it('Should get something', fakeAsync(() => {
    let result;
    cg.get('http://localhost')
      .map(x => JSON.parse(x))
      .subscribe(x => {
        result = x;
        expect(result).toMatchObject({
          content: 'ok'
        });
      });
    tick();
    const req = htc.expectOne('http://localhost')
    expect(req.request.method).toBe('GET');
    req.flush({
      content: 'ok'
    });
  }));

  it('Should use cashed data', fakeAsync(() => {
    let results = [];

    cg.get('http://localhost')
      .map(x => JSON.parse(x))
      .subscribe(x => {
        results.push(x);
      });

    tick();
    htc.expectOne('http://localhost').flush({
      content: 'ok'
    });
    expect(results).toMatchObject([
      {
        content: 'ok'
      }
    ]);
  }));

  it('Should use cached data and new data', fakeAsync(() => {
    let results = [];
    cg.get('http://localhost')
      .map(x => JSON.parse(x))
      .subscribe(x => {
        results.push(x);
      });

    tick();
    htc.expectOne('http://localhost').flush({
      content: 'ok again'
    });
    expect(results).toMatchObject([
      {
        content: 'ok'
      },
      {
        content: 'ok again'
      }
    ]);
  }));

  it('Should throw an http error', fakeAsync(() => {
    let error;
    cg.get('http://localhost/not-found')
      .map(x => JSON.parse(x))
      .subscribe(x => { }, e => {
        error = e;
      });
    tick();
    htc.expectOne('http://localhost/not-found').error(new ErrorEvent('Not Found'), {
      status: 404
    });
    expect(error.status).toBe(404);
  }));

  it('Should throw an storage error', fakeAsync(() => {
    let error;
    cg.get('http://localhost/storage-error')
      .map(x => JSON.parse(x))
      .subscribe(x => { }, e => {
        error = e;
      });
    tick();
    expect(error.message).toBe('StorageError');
  }));

  it('Should request with headers', fakeAsync(() => {
    let result;
    cg.get('http://localhost', { myheder: 'xxx'})
      .map(x => JSON.parse(x))
      .subscribe(x => {
        result = x;
      });
    tick();
    const req = htc.expectOne('http://localhost');
    expect(req.request.headers).toMatchObject({
      myheder: 'xxx'
    });
    req.flush({
      content: 'ok'
    })
    expect(result).toMatchObject({
      content: 'ok'
    });
  }));
});
