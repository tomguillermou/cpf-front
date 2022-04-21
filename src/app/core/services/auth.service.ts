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
    access_token: string;
}

@Injectable()
export class AuthenticationService {
    private $userConnected = new BehaviorSubject<User>(null);

    constructor(private _apiService: ApiService) {}

    public login(requestBody: LoginRequestBody) {
        return this._apiService.post<LoginResponseBody>('/auth/login', requestBody).pipe(
            map((authBody) => {
                localStorage.setItem('token', authBody.access_token);
            })
        );
    }

    public getProfile() {
        return this._apiService.get<User>('/profile').pipe(
            map((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                this.$userConnected.next(user);
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
