import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';

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
  private userService = inject(UserService);

  public title = '';
  description = '';
  priority: 'Alta' | 'Mitjana' | 'Baixa' = 'Baixa'; //Per defecte prioritat baixa

  onSubmit() {
    console.log(this.title)
    const title = this.title.trim();
    if (title) {
      this.userService.name$.pipe(take(1)).subscribe(user => { //Afegim accés al UserService i fem servir name$ amb take(1) per obtenir l'usuari actiu només una vegada
        this.taskService.addTask(title, this.description, this.priority, user);
        this.cleanContents();
      });      
    }
  }

  private cleanContents() {
    this.title = '';
    this.description = '';
  }
}