import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class CachedGet {
  constructor(private http: Http, private storage: Storage
  ) { }

  get(
    url: string,
    headers?: any
  ): Subject<any> {
    const sub: Subject<any> = new Subject<any>();
    this.getCache(url)
      .then(cache => {
        if (cache) sub.next(cache);
        this.http.get(url, { headers: headers })
          .subscribe(res => {
            if (cache !== res.text()) {
              this.storage.set(url, res.text());
              sub.next(res.text());
            }
            sub.complete();
          }, error => {
            sub.error(error);
          });
      })
      .catch(error => sub.error(error));
    return sub;
  }

  async getCache(key: string): Promise<string> {
    await this.storage.ready();
    return await this.storage.get(key);
  }
}
