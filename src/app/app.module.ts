import { NgModule } from '@angular/core';

// Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutingModule } from './routing.module';

// Pages
import { AuthModule } from './pages/auth/auth.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { FormModule } from './pages/form/form.module';

// App + layout components
import { AppComponent } from './app.component';

@NgModule({
    imports: [CoreModule, SharedModule, RoutingModule, AuthModule, DashboardModule, FormModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
