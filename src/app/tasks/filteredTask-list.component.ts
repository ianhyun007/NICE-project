import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITask } from './task';
import { TaskService } from './task.service';

@Component({
    templateUrl: './filteredTask-list.component.html'
})

export class FilteredTaskListComponent implements OnInit {
    taskListHeading: string;
    errorMessage: string;
    tasks: ITask[] = [];
    
    constructor(private _route: ActivatedRoute, private _router: Router, private _taskService: TaskService) { }
    
    ngOnInit() {
        let filterID = this._route.snapshot.paramMap.get('id');
        this.callingServiceMethod(filterID);
    }

    filterClicked(filterID: string): void {
        filterID = filterID.trim();
        if (!filterID) { return; }
        this.callingServiceMethod(filterID);
    }

    callingServiceMethod(id: string): void  {
        if(id==='CP') {
            this.taskListHeading = 'COMPLETE';  
            this._taskService.getCompleteTasks()
                .subscribe(tasks => this.tasks = tasks,
                error => this.errorMessage = <any>error);
        }
        else if(id==='IP')    {
            this.taskListHeading = 'IN PROGRESS';  
            this._taskService.getInprogressTasks()
                .subscribe(tasks => this.tasks = tasks,
                error => this.errorMessage = <any>error);
        }
        else if(id==='NS') {
            this.taskListHeading = 'NOT STARTED';  
            this._taskService.getNotstartedTasks()
                .subscribe(tasks => this.tasks = tasks,
                error => this.errorMessage = <any>error);
        }
        else if(id==='NC') {
            this.taskListHeading = 'NOT COMPLETED';  
            this._taskService.getNotcompleted()
                .subscribe(tasks => this.tasks = tasks,
                error => this.errorMessage = <any>error);
        } 
    }
}