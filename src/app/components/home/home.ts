import { Component } from '@angular/core';
import { TaskList } from '../task-list/task-list';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-home',
  imports: [TaskForm, TaskList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected title = 'ToDoList';
}
