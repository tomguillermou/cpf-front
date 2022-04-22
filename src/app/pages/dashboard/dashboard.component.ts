import { Component, OnInit } from '@angular/core';
import { LeadService } from '@shared/services';

import { AuthenticationService } from 'app/core/services';
import { User } from 'app/shared/models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    public userConnected: User | null;

    constructor(
        private readonly _authService: AuthenticationService,
        private readonly _leadService: LeadService
    ) {}

    ngOnInit(): void {
        this._authService.getUserConnected().subscribe((user) => {
            this.userConnected = user;
        });
    }

    public downloadCsv() {
        this._leadService.downloadCsv();
    }

    async deleteUser(userId: string): Promise<void> {}
}
