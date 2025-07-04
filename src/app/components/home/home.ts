import { Component } from '@angular/core';
import { TaskList } from '../task-list/task-list';
import { TaskForm } from '../task-form/task-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TaskForm, TaskList, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected title = 'ToDoList';
}
