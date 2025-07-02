//Classe app per importar i utilitzar el servei

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'Todolist';

  //Injectem el servei
  private taskService = inject(TaskService);

  //Propietats pel formulari
  newTaskTitle = '';
  newTaskDescription = '';

  //Exposem les tasques del servei
  get tasks() {
    return this.taskService.tasks();
  }

  //Mètode per afegir una nova tasca
  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle, this.newTaskDescription);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }

  //Mètode per marcar/desmarcar com a completada
  compTask(taskId: number) {
    this.taskService.completedTask(taskId);
  }

  //Mètode per eliminar una tasca
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

}
