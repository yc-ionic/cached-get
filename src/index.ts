import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { CachedGet } from './service';

export { CachedGet } from './service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__cached_http'
    })
  ],
  declarations: [
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CachedGetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CachedGetModule,
      providers: [CachedGet]
    };
  }
}
