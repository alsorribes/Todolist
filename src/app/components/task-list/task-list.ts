import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { RouterModule } from '@angular/router';
import { TaskStatusFilterPipe } from '../../pipes/task-status-filter-pipe';
import { PriorityFilterPipe } from '../../pipes/priority-filter-pipe';

//Llista de tasques
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskStatusFilterPipe, PriorityFilterPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  private taskService = inject(TaskService);
  filter: 'all' | 'completed' | 'pending' = 'all';  //Declarem els estats de les tasques per poder filtrar-los
  selectedPriority: 'Alta' | 'Mitjana' | 'Baixa' | 'all' = 'all';  //Declarem les prioritats de cada tasca

  //Exposem les tasques del servei
  get tasks() {
    return this.taskService.tasks();
  }

  //Mètode per marcar/desmarcar com a completada
  compTask(taskId: number) {
    this.taskService.completedTask(taskId);
  }

  //Mètode per eliminar una tasca
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  //Mètodes per obtenir estadístiques
  get totalTasks() {
    return this.taskService.getTotalTasksCount();
  }

  get completedTasks() {
    return this.taskService.getCompletedTasksCount();
  }

  get pendingTasks() {
    return this.totalTasks - this.completedTasks;
  }

  //Mètode per netejar les tasques completades
  clearCompleted() {
    this.taskService.clearCompletedTasks();
  }

  //Mètode per netejar totes les tasques
  clearAll() {
    if (confirm('Estas segur que vols eliminar totes les tasques?')) {
      this.taskService.clearAllTasks();
    }
  }

  setPriorityFilter(priority: 'Alta' | 'Mitjana' | 'Baixa' | 'all'): void {
    this.selectedPriority = priority;
  }

  setStatusFilter(status: 'all' | 'completed' | 'pending'): void {
    this.filter = status;
  }

}