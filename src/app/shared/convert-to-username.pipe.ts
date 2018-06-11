import { Pipe } from '@angular/core';

import { UserService } from '../users/user.service';

@Pipe({
    name: 'convertToUsernamePipe'
})

export class ConvertToUsernamePipe {

    constructor(private _userService: UserService) {
    }

    transform(value: number): string{
       return 'll';//this._userService.getStatusTitle(value); 
    }
}