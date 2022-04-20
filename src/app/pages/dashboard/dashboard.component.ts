import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'app/core/services';
import { User } from 'app/shared/models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    public userConnected: User | null;

    constructor(private _authService: AuthenticationService) {}

    ngOnInit(): void {
        this._authService.getUserConnected().subscribe((user) => {
            this.userConnected = user;
        });
    }

    async deleteUser(userId: string): Promise<void> {}
}
