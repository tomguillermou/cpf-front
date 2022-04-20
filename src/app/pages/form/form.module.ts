import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards';
import { SharedModule } from 'app/shared/shared.module';

import { FormComponent } from './form.component';

const routes: Routes = [{ path: 'form', component: FormComponent, canActivate: [AuthGuard] }];

@NgModule({
    imports: [SharedModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    declarations: [FormComponent],
    exports: [RouterModule],
})
export class FormModule {}
