import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())
, provideHttpClient(withFetch()),    provideHttpClient(withInterceptors([authInterceptorFn]))

  ]

};
let token = '';

export function setToken(newToken: string) {
  token = newToken;
}

export function authInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn) {
  const authReq = token
  ? req.clone({ setHeaders: {  Authorization: `Bearer ${token}`  }
  })
  : req;
  return next(authReq);
}
// export function authInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn) {
//   const authReq = token
//   ? req.clone({ setHeaders: { 'x-access-token': token }
//   })
//   : req;
//   return next(authReq);
// }
