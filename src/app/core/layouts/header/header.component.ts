import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/core/services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    public showHeader = false;

    constructor(private _router: Router, private _authService: AuthenticationService) {
        this._authService.getUserConnected().subscribe((user) => {
            this.showHeader = Boolean(user);
        });
    }

    onLogout(): void {
        this._authService.logout();
        this._router.navigateByUrl('/login');
    }
}
