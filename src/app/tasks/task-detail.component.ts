import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ITask } from './task';
import { TaskService } from './task.service';
import { IUser } from '../users/user';
import { UserService } from '../users/user.service';

@Component({
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: ITask;
  errorMessage: string;
  statusTitle: string[];
  selectedStatusTitle: string;
  selectedTaskUserId: number;
  defaultSelectOption: string;
  taskDetailForm: FormGroup;
  users: IUser[] = [];

  constructor(private _route: ActivatedRoute, private _router: Router, private _taskService: TaskService, private fb: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.defaultSelectOption = 'notstarted';
    let id = +this._route.snapshot.paramMap.get('id');
    if(!isNaN(id))
    {
      // ***** THE REST API WAS MISSING FOR GETTING A TASK USING ID, THAT IS WHY I HARDCODED TO SHOW THE "UPDATING A TASK" API USAGE. **********
      this.task =
      {
        "id": 1,
        "description": "current pay period, all pay out",
        "name": "payroll",
        "status": 2,
        "assigned_user_id": 23
      }
      // ***** THE REST API WAS MISSING FOR GETTING A TASK USING ID, THAT IS WHY I HARDCODED TO SHOW THE "UPDATING A TASK" API USAGE. **********
      this.selectedStatusTitle = this._taskService.getStatusTitle(this.task.status);
      this.selectedTaskUserId = this.task.assigned_user_id;
    }
      
    this.statusTitle = this._taskService.getAllStatusTitle();

    this.taskDetailForm = this.fb.group({
      description: '',
      name: '',
      status: '',
      assigned_user_id: ''
      });

      this._userService.getUsers()
      .subscribe(users => this.users = users,
          error => this.errorMessage = <any>error);
    }

  createTask(): void {
    let p = Object.assign({}, this.task, this.taskDetailForm.value);
    if (!p.description || !p.name || !p.status || !p.assigned_user_id) { return; }
    else {
      this._taskService.createTask(p)
        .subscribe(() => this._router.navigate(['/tasks']));
    }
  }

  updateTask(): void {
    let p = Object.assign({}, this.task, this.taskDetailForm.value);
    this._taskService.updateTask(p)
      .subscribe(() => this._router.navigate(['/tasks']));
    }
}
