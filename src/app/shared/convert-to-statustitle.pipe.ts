import { Pipe } from '@angular/core';

import { TaskService } from '../tasks/task.service';

@Pipe({
    name: 'convertToStatustitlePipe'
})

export class ConvertToStatustitlePipe {

    constructor(private _taskService: TaskService) {
    }

    transform(value: number): string{
        return this._taskService.getStatusTitle(value);
    }
}