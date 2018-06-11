import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list.component';
import { TaskListComponent } from './tasks/task-list.component';
import { FilteredTaskListComponent } from './tasks/filteredTask-list.component';
import { DefaultComponent } from './default.component';
import { UserDetailComponent } from './users/user-detail.component';
import { TaskDetailComponent } from './tasks/task-detail.component';
import { ConvertToStatustitlePipe } from './shared/convert-to-statustitle.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    TaskListComponent,
    DefaultComponent,
    UserDetailComponent,
    FilteredTaskListComponent,
    TaskDetailComponent,
    ConvertToStatustitlePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/:id', component: TaskDetailComponent },
      { path: 'filteredTasks/:id', component: FilteredTaskListComponent },
      { path: 'default', component: DefaultComponent },
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: '**', redirectTo: 'default', pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
