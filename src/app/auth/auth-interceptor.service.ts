import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token')
    if (token) {
      return next.handle(
        req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
      )
    }
    return next.handle(req)
  }
}
