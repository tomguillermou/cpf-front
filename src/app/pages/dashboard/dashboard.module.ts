import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthAdminGuard } from 'app/core/guards';
import { SharedModule } from 'app/shared/shared.module';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthAdminGuard] },
];

@NgModule({
    imports: [SharedModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    declarations: [DashboardComponent],
    exports: [RouterModule],
})
export class DashboardModule {}
