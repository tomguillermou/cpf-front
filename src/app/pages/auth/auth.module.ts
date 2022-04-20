import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

// Page components
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
    imports: [SharedModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    declarations: [LoginComponent],
    exports: [RouterModule],
})
export class AuthModule {}
