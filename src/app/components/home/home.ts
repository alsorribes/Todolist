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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskForm, TaskList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected title = 'ToDoList';
  tasks: Task[] = [];
  name$!: Observable<string>;
  userMenuOpen = false;
  public showForm = false;


  constructor(private taskService: TaskService, private userService: UserService) {
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
}
