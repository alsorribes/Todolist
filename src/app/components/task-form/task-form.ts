import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
  showUserMessage = false; // Per mostrar missatge a la interfície

  // Correcció: Convertir el observable a signal directament
  private userSignal = toSignal(this.userService.name$, { initialValue: 'Usuari inicial' });
  
  // Computed que verifica si hi ha un usuari valid seleccionat
  currentUser = computed(() => {
    const user = this.userSignal();
    return user !== 'Usuari inicial' ? user : null;
  });

  ngOnInit() {
    // Mostrar alerta a l'arrancar la aplicació si no hi ha un usuari seleccionat
    if (typeof window !== 'undefined' && !this.currentUser()) {
      setTimeout(() => {
        window.alert('Selecciona un usuari abans de començar a afegir tasques!');
      }, 100);
    }
  }

  onSubmit() {
    console.log(this.title)
    const title = this.title.trim();
    const user = this.currentUser();

    if (!user) {
      console.warn('Selecciona un usuari abans de començar a afegir tasques!');
      return;
    }

    if (title) {
        this.taskService.addTask(title, this.description, this.priority, user);
        this.cleanContents();     
    }
  }

  showUserAlert(): void {
    if (typeof window !== 'undefined' && !this.currentUser()) {
      window.alert('Selecciona un usuari abans de començar a afegir tasques!');
    }
  }

  private cleanContents() {
    this.title = '';
    this.description = '';
  }
}