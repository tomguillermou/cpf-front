import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Services
import { ApiService, AuthenticationService } from './services';

// Layouts
import { HeaderComponent } from './layouts';

@NgModule({
    declarations: [HeaderComponent],
    imports: [BrowserModule, HttpClientModule],
    providers: [ApiService, AuthenticationService],
    exports: [HeaderComponent],
})
export class CoreModule {}
