import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,  private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        error => {
          if (error) {
            console.log(error);
            switch(error.status){
              case 400:
                const errorsList= error.error.errors;
                if (errorsList){
                  const modelStateErrors = [];
                  for (const e in errorsList){
                    if (errorsList[e]){
                      modelStateErrors.push(errorsList[e]);
                      this.toastr.error(errorsList[e]);
                    }
                  }
                  this.toastr.error((error.statusText,error.status));

                  throw modelStateErrors.flat();
                } else {
                  console.log((error.statusText,error.status));
                }
                break;
              case 401:
                this.toastr.error((error.statusText,error.status));
                break;
              case 404:
                this.toastr.error((error.statusText,error.status));
                this.router.navigateByUrl('/not-found');
                break;
              case 500:
                const navigationExtras: NavigationExtras = {state: {error: error.error}};
                this.router.navigateByUrl('/server-error', navigationExtras);
                break;
              default:
                this.toastr.error('Something unexpected went wrong !');
                break;
            }
          }
          return throwError(error);
        }
      )
    )
  }
}
