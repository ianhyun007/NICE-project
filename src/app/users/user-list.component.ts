import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { UserService } from './user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router  } from '@angular/router';

@Component({
    selector: 'tl-user-list',
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
    errorMessage: string;
    users: IUser[] = [];
    user: IUser;
    userForm: FormGroup;

    constructor(private _userService: UserService, private fb: FormBuilder,  private _router: Router,) {}   

    ngOnInit(): void {
        this._userService.getUsers()
            .subscribe(users => this.users = users,
                error => this.errorMessage = <any>error);
        this.userForm = this.fb.group({
            userName: ''
        });
    }

    saveUser(name: string): void {
        name = name.trim();
        if (!name) { return; }
        let p = Object.assign({}, this.user, this.userForm.value);
        this._userService.createUser(p)
        .subscribe(user => {
            this.users.push(user);
        });
        this.userForm.reset();
    }

    deleteUser(user: IUser): void {
        if(confirm("ARE YOU SURE TO DELETE "+user.userName))
        {
            this._userService.deleteUser(user.id).subscribe();
            this.users = this.users.filter(h => h !== user);
        }
        else return;
    }
}