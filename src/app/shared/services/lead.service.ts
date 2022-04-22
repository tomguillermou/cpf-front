import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map } from 'rxjs/operators';

import { ApiService } from 'app/core/services';
import { User } from 'app/shared/models';

interface CreateLeadRequestBody {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    employed: boolean;
    sector: string;
    trained: boolean;
    connected: boolean;
    budget: number;
    account: boolean;
    prospector: string;
}

interface CreateLeadResponseBody {}

@Injectable()
export class LeadService {
    constructor(private _apiService: ApiService) {}

    public createOne(body: CreateLeadRequestBody) {
        return this._apiService.post<CreateLeadResponseBody>('/leads', body).pipe(
            map((responseBody) => {
                return responseBody;
            })
        );
    }

    public downloadCsv() {
        this._apiService.getFile('/leads/csv').subscribe((file) => {
            saveAs(file, `Prospects_CPF_${new Date().toISOString()}.csv`);
        });
    }
}
