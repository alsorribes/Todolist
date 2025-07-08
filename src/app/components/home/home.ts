import { Component } from '@angular/core';
import { TaskList } from '../task-list/task-list';
import { TaskForm } from '../task-form/task-form';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RouterModule } from '@angular/router';
import { User } from "../user/user";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskForm, TaskList, User],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected title = 'ToDoList';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getPendingTasks();
  }
}
