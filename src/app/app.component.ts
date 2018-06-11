import { Component } from '@angular/core';
import { UserService } from './users/user.service';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ UserService, TaskService ]
})
export class AppComponent {
  title = 'TODO LIST MANAGEMENT';
}
