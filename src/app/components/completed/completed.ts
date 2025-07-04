import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [CommonModule], //Importem CommonModule per poder fer servir el ngFor i el ngIf al completed.html
  templateUrl: './completed.html',
  styleUrl: './completed.css'
})
export class Completed {

  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.completedTasks = this.taskService.getCompletedTasks(); //Filtrem per les tasques completades
  }
}
