import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/core/services';
import { User } from 'app/shared/models';
import { LeadService } from 'app/shared/services';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
    public userConnected: User | null;

    public leadForm: FormGroup;
    public displayValidationError: boolean = false;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _authService: AuthenticationService,
        private _leadService: LeadService
    ) {
        this.leadForm = this._formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            email: ['', Validators.required],
        });

        this._authService.getUserConnected().subscribe((user) => {
            this.userConnected = user;
        });
    }

    ngOnInit(): void {}

    public onSubmit(): void {
        if (this.userConnected) {
            if (this.leadForm.valid) {
                this.displayValidationError = false;

                this._leadService.createOne({}).subscribe({
                    next: (body): void => {
                        this._router.navigateByUrl('/form');
                    },
                    error: (error): void => {
                        console.log('🚀 ~ error', error);
                    },
                });
            } else {
                this.displayValidationError = true;
            }
        }
    }
}
