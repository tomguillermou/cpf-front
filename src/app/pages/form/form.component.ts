import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/core/services';
import { User } from 'app/shared/models';
import { LeadService } from 'app/shared/services';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
    public userConnected: User | null;

    public leadForm: FormGroup;
    public showInvalid = false;
    public showSectorGroup = false;

    public todaysDate: string;

    private _previousValues: Record<string, unknown>;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _authService: AuthenticationService,
        private _leadService: LeadService
    ) {
        this.todaysDate = moment().format('YYYY-MM-DD');

        this.leadForm = this._formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            email: ['', Validators.required],
            employed: ['', Validators.required],
            sector: ['', Validators.required],
            trained: ['', Validators.required],
            connected: ['', Validators.required],
            budget: [0, Validators.required],
            account: ['', Validators.required],
            callDate: ['', Validators.required],
            callHour: ['', Validators.required],
            agrees: [false, Validators.requiredTrue],
        });

        this._authService.getUserConnected().subscribe((user) => {
            this.userConnected = user;
        });
    }

    ngOnInit(): void {
        this._previousValues = this.leadForm.value;

        this.leadForm.valueChanges.subscribe((formValues) => {
            const { employed } = formValues;

            this.showSectorGroup = employed === '' || employed === 'true';

            if (!this.showSectorGroup) {
                this.leadForm.get('sector').setValue('none', { emitEvent: false });
            } else if (this.showSectorGroup && this._previousValues.employed === 'false') {
                this.leadForm.get('sector').setValue('', { emitEvent: false });
            }

            this._previousValues = formValues;
        });
    }

    public async onSubmit(): Promise<void> {
        if (this.userConnected && this.leadForm.valid) {
            this.showInvalid = false;

            this._leadService
                .createOne({
                    ...this.leadForm.value,
                    prospector: this.userConnected._id,
                    prospectionDate: moment.utc().toISOString(),
                })
                .subscribe({
                    next: async (_body) => {
                        await this.displayFormSuccessModal();
                        this.leadForm.reset();
                        this._router.navigateByUrl('/form');
                    },
                    error: async () => {
                        await this.displayFormErrorModal();
                    },
                });
        } else {
            this.showInvalid = true;
        }
    }

    private async displayFormSuccessModal(): Promise<void> {
        await Swal.fire({
            title: 'Merci !',
            text: 'Vos réponses ont bien été enregistrées. Nous reviendrons vers vous dans les plus brefs délais.',
            icon: 'success',
            confirmButtonText: 'Suivant',
        });
    }

    private async displayFormErrorModal(): Promise<void> {
        await Swal.fire({
            title: 'Oops !',
            text: "Une erreur s'est produite lors de la sauvegarde de vos réponses. Réessayez plus tard.",
            icon: 'error',
            confirmButtonText: 'Suivant',
        });
    }
}
