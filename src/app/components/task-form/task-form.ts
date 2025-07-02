import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

//Formulari per afegir tasques
@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  private taskService = inject(TaskService);

  title = '';
  description = '';

  onSubmit() {
    if (this.title.trim()) {
      this.taskService.addTask(this.title, this.description);
      this.title = '';
      this.description = '';
    }
  }
}