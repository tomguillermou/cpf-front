import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
    constructor(private _httpClient: HttpClient) {}

    public get(resource: string, withAuthentication = false) {
        let headers = {};

        if (withAuthentication) {
            headers = this.getHeadersWithAuthentication();
        }

        return this._httpClient.get(environment.apiUrl + resource, { headers });
    }

    public post<TResponseBody>(resource: string, body: unknown, withAuthentication = false) {
        let headers = {};

        if (withAuthentication) {
            headers = this.getHeadersWithAuthentication();
        }

        return this._httpClient.post<TResponseBody>(environment.apiUrl + resource, body, {
            headers,
        });
    }

    private getHeadersWithAuthentication(): HttpHeaders {
        return new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
    }
}
