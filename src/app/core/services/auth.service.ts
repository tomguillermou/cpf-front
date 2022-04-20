import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'app/shared/models';

import { ApiService } from './api.service';

interface LoginRequestBody {
    email: string;
    password: string;
}

interface LoginResponseBody {
    token: string;
    user: User;
}

@Injectable()
export class AuthenticationService {
    private $userConnected = new BehaviorSubject<User>(null);

    constructor(private _apiService: ApiService) {}

    public login(requestBody: LoginRequestBody) {
        return this._apiService.post<LoginResponseBody>('/auth/login', requestBody).pipe(
            map((responseBody) => {
                localStorage.setItem('token', responseBody.token);
                localStorage.setItem('user', JSON.stringify(responseBody.user));
                this.$userConnected.next(responseBody.user);
                return responseBody;
            })
        );
    }

    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$userConnected.next(null);
    }

    public async isLoggedIn(): Promise<boolean> {
        // Improve by making call to API to check token authenticity
        return typeof localStorage.getItem('token') === 'string';
    }

    public getUserConnected(): Observable<User> {
        const userStringified = localStorage.getItem('user');

        if (userStringified) {
            this.$userConnected.next(JSON.parse(userStringified));
        } else {
            this.$userConnected.next(null);
        }

        return this.$userConnected.asObservable();
    }
}
