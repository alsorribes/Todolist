import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//Formulari per afegir tasques
@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  private taskService = inject(TaskService);

  public title = '';
  description = '';
  priority: 'Alta' | 'Mitjana' | 'Baixa' = 'Baixa'; //Per defecte prioritat baixa

  onSubmit() {
    console.log(this.title)
    const title = this.title.trim();
    if (title) {
      this.taskService.addTask(title, this.description, this.priority);
      this.cleanContents();
    }
  }

  private cleanContents() {
    this.title = '';
    this.description = '';
  }
}