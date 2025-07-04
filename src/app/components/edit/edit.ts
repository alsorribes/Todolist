import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.task = this.taskService.getTaskById(id);
  }

  /**
   * Navegar cap enrere
   */
  save() {
    if (this.task) { //Fem aquest if per veure si task existeix abans de fer-lo servir
      this.taskService.updateTask(this.task.id, this.task!);
      window.history.back();
    }
  }
}