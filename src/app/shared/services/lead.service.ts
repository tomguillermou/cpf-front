import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApiService } from 'app/core/services';
import { User } from 'app/shared/models';

interface CreateLeadRequestBody {}

interface CreateLeadResponseBody {}

@Injectable()
export class LeadService {
    constructor(private _apiService: ApiService) {}

    public createOne(requestBody: CreateLeadRequestBody) {
        return this._apiService.post<CreateLeadResponseBody>('/leads', requestBody).pipe(
            map((responseBody) => {
                return responseBody;
            })
        );
    }
}
