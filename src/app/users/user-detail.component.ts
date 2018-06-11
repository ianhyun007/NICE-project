import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from './user.service';
import { IUser } from './user';

@Component({
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: IUser;
  errorMessage: string;
  userDetailForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
      let id = +this._route.snapshot.paramMap.get('id');
      this._userService.getUser(id)
            .subscribe(user => this.user = user,
                error => this.errorMessage = <any>error);
      this.userDetailForm = this.fb.group({
        userName: ''
      });
    }

    updateUser(): void {
      let p = Object.assign({}, this.user, this.userDetailForm.value);
      this._userService.updateUser(p)
        .subscribe(() => this._router.navigate(['/users']));
    }
  }

