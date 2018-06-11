import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IUser } from './user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class UserService {
    users: IUser[] = [];
    private _userUrl = 'http://localhost:4200/server/users';

    constructor(private _http: HttpClient) {}

    getUsers(): Observable<IUser[]> {
        return this._http.get<IUser[]>(this._userUrl)
            .pipe(
                tap(data => console.log('All: '+ JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    getUser(id: number): Observable<IUser> {
        const url = `${this._userUrl}/${id}`; 
        return this._http.get<IUser>(url)
            .pipe(
                tap(data => console.log('All: '+ JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createUser(user: IUser): Observable<IUser> {
        return this._http.post(this._userUrl, user, httpOptions)
            .pipe(
                tap((user: IUser) => console.log(`added user w/ id=${user.id}`)),
                catchError(this.handleError)
            )
    }

    deleteUser (id: number):  Observable<IUser[]> {
        const url = `${this._userUrl}/${id}`;  
        return this._http.delete<IUser[]>(url, httpOptions);
    }

    updateUser (user: IUser): Observable<any> {
        const url = `${this._userUrl}/${user.id}`; 
        return this._http.put(url, user, httpOptions)
            .pipe(
                tap(_ => console.log(`updated hero id=${user.id}`)),
                catchError(this.handleError)
            )
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}