import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ITask } from './task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {
  tasks: ITask[] = [];  
  private statusData: string[] = ['notstarted', 'inprogress', 'complete'];
  private _userUrl = 'http://localhost:4200/server/tasks';

  constructor(private _http: HttpClient) {}

  getStatusTitle(id: number): string {
    return this.statusData[id];
  }

  getAllStatusTitle(): string[] {
    return this.statusData;
  }

  getTasks(): Observable<ITask[]> {
    return this._http.get<ITask[]>(this._userUrl)
      .pipe(
        tap(data => console.log('All: '+ JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  getTask(id: number): Observable<ITask> {
    const url = `${this._userUrl}/${id}`; 
    return this._http.get<ITask>(this._userUrl)
      .pipe(
        tap(data => console.log('All: '+ JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  getCompleteTasks(): Observable<ITask[]> {
    const url = this._userUrl+'/complete';
    return this._http.get<ITask[]>(url)
      .pipe(
        tap(data => console.log('All: '+ JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  getInprogressTasks(): Observable<ITask[]> {
    const url = this._userUrl+'/inprogress';
    return this._http.get<ITask[]>(url)
      .pipe(
        tap(data => console.log('All: '+ JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  getNotstartedTasks(): Observable<ITask[]> {
    const url = this._userUrl+'/notstarted';
    return this._http.get<ITask[]>(url)
      .pipe(
        tap(data => console.log('All: '+ JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  getNotcompleted(): Observable<ITask[]> {
    const url = this._userUrl+'/notcompleted';
    return this._http.get<ITask[]>(url)
      .pipe(
        tap(data => console.log('All: '+ JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  createTask(task: ITask): Observable<ITask> {
    const tmpurl = this._userUrl+'/add/users';
    const url = `${tmpurl}/${task.assigned_user_id}`; 
    return this._http.post(url, task, httpOptions)
    .pipe(
      tap((task: ITask) => console.log(`created task w/ id=${task.id}`)),
      catchError(this.handleError)
    );
  }

  updateTask (task: ITask): Observable<ITask> {
    const tmpurl = this._userUrl+'/update/users';
    const url = `${tmpurl}/${task.assigned_user_id}`; 
    return this._http.put(url, task, httpOptions)
    .pipe(
      tap((task: ITask) => console.log(`updated task w/ id=${task.id}`)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}