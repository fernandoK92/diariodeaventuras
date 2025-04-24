import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideStorage } from '@ionic/storage-angular';
import { PLATFORM_ID } from '@angular/core';

function storageProviderFactory(platformId: Object) {
  return provideStorage(platformId, {
    name: '__mydb',
    driverOrder: ['indexeddb', 'localstorage']
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    {
      provide: 'STORAGE_PROVIDER',
      useFactory: storageProviderFactory,
      deps: [PLATFORM_ID]
    }
  ],
});