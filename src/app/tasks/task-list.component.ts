import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITask } from './task';
import { TaskService } from './task.service';

@Component({
    templateUrl: './task-list.component.html'
})

export class TaskListComponent {
    taskListHeading: string;
    errorMessage: string;
    tasks: ITask[] = [];
        
    constructor(private _taskService: TaskService, private _route: ActivatedRoute, private _router: Router) {
    }   

    ngOnInit(): void {
        this.taskListHeading = 'ALL';  
        this._taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks,
            error => this.errorMessage = <any>error);
        }
}