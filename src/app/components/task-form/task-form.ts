import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Output, EventEmitter } from '@angular/core';

import { 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonItem, 
  IonLabel, 
  IonInput, 
  IonTextarea, 
  IonButton, 
  IonSegment, 
  IonSegmentButton,
  IonIcon,
  AlertController,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

// CORREGIDO: Importar y registrar iconos correctamente
import { addIcons } from 'ionicons';
import { 
  checkmarkOutline, 
  alertCircleOutline, 
  warningOutline, 
  addOutline 
} from 'ionicons/icons';

// Registrar iconos globalmente ANTES de la declaración del componente
addIcons({
  'checkmark-outline': checkmarkOutline,
  'alert-circle-outline': alertCircleOutline,
  'warning-outline': warningOutline,
  'add-outline': addOutline
});

//Formulari per afegir tasques
@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule, 
    CommonModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol
  ],
  standalone: true,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  private taskService = inject(TaskService);
  private userService = inject(UserService);
  private alertController = inject(AlertController);

  @Output() closed = new EventEmitter<void>();    // ← s’emet quan s’ha de tancar

  // signal per ocultar/mostrar el formulari
  showForm = signal(false);

  public title = '';
  description = '';
  priority: 'Alta' | 'Mitjana' | 'Baixa' = 'Baixa';
  showUserMessage = false;
  isAlertOpen = false;

  // Convertir el observable a signal
  private userSignal = toSignal(this.userService.name$, { 
    initialValue: null,
    requireSync: false 
  });
  
  // Computed que verifica si hi ha un usuari valid seleccionat
  currentUser = computed(() => {
    const user = this.userSignal();
    return user && user !== 'Usuari inicial' ? user : null;
  });

  constructor() {
    // Los iconos ya están registrados arriba
    console.log('TaskForm initialized');
  }

  ngOnInit() {
    // Espera a que Ionic carregui la vista
    setTimeout(() => {
      if (!this.currentUser()) {
        this.showUserAlert();
      }
    }, 500);
  }

  async onSubmit() {
    try {
      const title = this.title.trim();
      const user = this.currentUser();

      if (!user) {
        await this.showUserAlert();
        return;
      }

      if (title) {
        this.taskService.addTask(title, this.description, this.priority, user);
        this.cleanContents();
        
        //await this.presentSuccessAlert();
        this.closed.emit();
        //this.showForm.set(false);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  }

  // CORREGIDO: Simplificar el manejo de alertas
  async showUserAlert(): Promise<void> {
    try {
      if (this.currentUser() || this.isAlertOpen) return;

      this.isAlertOpen = true;

      const alert = await this.alertController.create({
        header: 'Cap usuari seleccionat',
        message: 'Abans d\'afegir una tasca, selecciona un usuari.',
        buttons: [
          {
            text: 'D\'acord',
            handler: () => {
              this.isAlertOpen = false;
            }
          }
        ],
        cssClass: 'custom-alert'
      });

      await alert.present();
      
      // Cleanup automático
      await alert.onDidDismiss();
      this.isAlertOpen = false;
      
    } catch (error) {
      console.error('Error showing user alert:', error);
      this.isAlertOpen = false;
    }
  }

  // Método para mostrar mensaje de éxito
  async presentSuccessAlert() {
    try {
      const alert = await this.alertController.create({
        header: 'Tasca afegida',
        message: 'La tasca s\'ha afegit correctament!',
        buttons: ['OK'],
        cssClass: 'success-alert'
      });

      await alert.present();
    } catch (error) {
      console.error('Error showing success alert:', error);
    }
  }

  private cleanContents() {
    this.title = '';
    this.description = '';
    this.priority = 'Baixa';
  }

  // Método para obtener el color del segmento según la prioridad
  getSegmentColor(): string {
    switch (this.priority) {
      case 'Alta':
        return 'danger';
      case 'Mitjana':
        return 'warning';
      case 'Baixa':
        return 'success';
      default:
        return 'medium';
    }
  }

  // Método para obtener el icono según la prioridad
  getPriorityIcon(): string {
    switch (this.priority) {
      case 'Alta':
        return 'alert-circle-outline';
      case 'Mitjana':
        return 'warning-outline';
      case 'Baixa':
        return 'checkmark-outline';
      default:
        return 'checkmark-outline';
    }
  }
}
