import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Libraries
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public toast: ToastrService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      const error = err.error.message ? err.error.message.toString() : err.statusText;

      switch (err.status) {
        case 400:
        case 401:
        case 404:
        case 422:
          this.toast.error(error);
          break;
        case 403:
          this.toast.error(error);
          break;
        default:
          this.toast.error('Error general!');
          break;
      }

      return throwError(err);
    }));
  }
}
