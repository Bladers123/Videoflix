import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    provideRouter(
      routes,
      withHashLocation()
    ),

    ...(appConfig.providers || [])
  ]
})
.catch(err => console.error(err));
