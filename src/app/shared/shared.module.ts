import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// Components

// Services
import { LeadService } from './services';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule],
    declarations: [],
    providers: [LeadService],
    exports: [BrowserModule, ReactiveFormsModule],
})
export class SharedModule {}
