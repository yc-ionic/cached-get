import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CachedGet } from './service';

export { CachedGet } from './service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
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
