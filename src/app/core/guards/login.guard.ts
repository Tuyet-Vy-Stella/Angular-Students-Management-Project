import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthService } from 'app/features/auth/services/auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.authService.user.pipe(
            take(1),
            map((user) => {
                const isAuth = !!user;
                console.log({ isAuth });
                if (isAuth) {
                    return this.router.createUrlTree(['/']);
                }
                return true;
            })
        );
    }
}
