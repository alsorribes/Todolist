import { Component } from '@angular/core';
import { TaskList } from '../task-list/task-list';
import { TaskForm } from '../task-form/task-form';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RouterModule } from '@angular/router';
import { User } from "../user/user";
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IonicModule } from '@ionic/angular';
import { pencilOutline, personCircleOutline } from 'ionicons/icons';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskForm, TaskList, IonicModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  protected title = 'ToDoList';
  tasks: Task[] = [];
  name$!: Observable<string>;
  userMenuOpen = false;
  public showForm = false;
  pencilOutline = pencilOutline;
  personCircleOutline = personCircleOutline;
  currentLocation: { lat: number; lng: number } | null = null;
  private watchId: string | null = null;

  constructor(private taskService: TaskService, private userService: UserService, private geolocationService: GeolocationService) {
    this.tasks = this.taskService.getPendingTasks();
  }

  ngOnInit(): void {
    // Ens subscrivim al nom actual de l'usuari
    this.name$ = this.userService.name$;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  setToJoan(): void {
    this.userService.setNameToJoan();
    this.userMenuOpen = false;
  }

  setToJordi(): void {
    this.userService.setNameToJordi();
    this.userMenuOpen = false;
  }

  setToAlba(): void {
    this.userService.setNameToAlba();
    this.userMenuOpen = false;
  }

  openForm() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
  }

  async getLocation() {
  console.log('Botó de geolocalització clickat');
  try {
    console.log('Intentant obtenir localització...');
    this.currentLocation = await this.geolocationService.getCurrentPosition();
    console.log('Localització obtinguda:', this.currentLocation);
  } catch (e) {
    console.error('Error obtenint la posició:', e);
    // Mostrar error a la UI temporalment
    alert('Error: ' + JSON.stringify(e));
  }
  }

  async beginWatching() {
    this.watchId = await this.geolocationService.startWatch();
  }

  async stopWatching() {
    if (this.watchId) {
      await this.geolocationService.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}
