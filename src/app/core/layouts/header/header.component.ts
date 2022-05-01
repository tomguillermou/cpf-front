import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/core/services';
import { User } from 'app/shared/models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    public isUserConnected: boolean;
    public isUserConnectedAnAdmin: boolean;

    constructor(private _router: Router, private _authService: AuthenticationService) {
        this._authService.getUserConnected().subscribe((user) => {
            this.isUserConnected = Boolean(user);
            this.isUserConnectedAnAdmin = this.isUserConnected && user.isAdmin;
        });
    }

    public onLogout(): void {
        this._authService.logout();
        this._router.navigateByUrl('/login');
    }
}
