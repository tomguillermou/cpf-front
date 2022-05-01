import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
    constructor(private _router: Router, private _authService: AuthenticationService) {}

    async canActivate(
        _next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ): Promise<boolean> {
        const isLoggedIn = await this._authService.isAdminLoggedIn();

        if (isLoggedIn) {
            return true;
        }

        this._router.navigateByUrl('/');
        return false;
    }
}
