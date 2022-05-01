import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/core/services';

@Component({
    templateUrl: './login.component.html',
    styles: ['.form { width: 100 %; max-width: 330px; padding: 15px; margin: auto; }'],
})
export class LoginComponent implements OnInit {
    public error = '';

    public loginForm: FormGroup;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _authService: AuthenticationService
    ) {
        this.loginForm = this._formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {}

    onSubmit() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;

        if (email && password) {
            this._authService.login({ email, password }).subscribe({
                next: (_body): void => {
                    this._authService.getProfile().subscribe({
                        next: (_body): void => {
                            this._router.navigateByUrl('/form');
                        },
                        error: (error): void => {
                            this.error = error;
                        },
                    });
                },
                error: (error): void => {
                    this.error = error;
                },
            });
        }
    }
}
