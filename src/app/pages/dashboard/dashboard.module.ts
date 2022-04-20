import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards';
import { SharedModule } from 'app/shared/shared.module';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [SharedModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    declarations: [DashboardComponent],
    exports: [RouterModule],
})
export class DashboardModule {}
