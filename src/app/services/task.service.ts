//Lògica per manejar tasques

import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //Utilitzem signals per l'estat reactiu
  //Signals = És un contenidor de valors que notifica als components quan el seu contingut canvia
  private tasksSignals = signal<Task[]>([]) //Signal d'array de tasques
  private nextId = signal<number>(1);  //Signal per al pròxim ID

  //Exposem les tasques com a senyal de només lectura
  readonly tasks = this.tasksSignals.asReadonly();

  constructor() { 
    //Carreguem les tasques del localStorage a l'inicialitzar
    this.loadTasksFromStorage();
  }

  /**
   * Obtenir totes les tasques
   */
  //getAllTasks(): Task[] {
  //  return this.tasks;
//  }

  /**
   * Afegir una nova tasca
   */
  addTask(title: string, description?: string): Task {
    const newTask: Task = {
      id: this.nextId(),
      title: title.trim(),
      description: description?.trim() || undefined,
      completed: false,
      createdAt: new Date()
    };

    //Actualitzem l'array de tasques
    this.tasksSignals.update(tasks => [...tasks, newTask]);

    //Incrementem l'ID per la pròxima tasca
    this.nextId.update(id => id+1);

    //Guardem al localStorage
    this.saveTasksToStorage();

    return newTask;
  }

  /**
   * Marcar una tasca com completada o no
   */
  completedTask(taskId: number): void {
    this.tasksSignals.update(tasks => 
      tasks.map(task =>   //Recorre cada tasca(task) a l'array tasks i verifica si el id de la tasca coincideix amb el taskId proporcionat
                          //si coincideix task.id === taskId crea una nova tasca amb l'estat completed invers
        task.id === taskId //Evitem bugs si id es un numero i taskId un string
          ? {...task, completed: !task.completed }
          //(...task) = operador de propagació per copiar les altres propietats
          : task
      )
      //Retorna un nou array amb les tasques actualitzades
    );
    this.saveTasksToStorage();
  }

  /**
   * Eliminar una tasca per ID
   */
  deleteTask(taskId: number): void {
    this.tasksSignals.update(tasks => 
      tasks.filter(task => task.id !== taskId) //Creem un nou array amb totes les tasques excepte aquella que el seu id coincideix amb taskId
    );
    this.saveTasksToStorage();
  }

  /**
   * Actualitzar una tasca existent
   */
  updateTask(taskId: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    this.tasksSignals.update(tasks => 
      tasks.map(task => 
        task.id === taskId
          ? {...task, ...updates}
          : task
      )
    );
    this.saveTasksToStorage();
  }

  /**
   * Obtenim una tasca per ID
   */
  getTaskById(taskId: number): Task | undefined {
    return this.tasksSignals().find(task => task.id === taskId)
  }

  /**
   * Obté totes les tasques completades
   */
  getCompletedTasks(): Task[] {
    return this.tasksSignals().filter(task => task.completed);
  }

  /**
   * Obté totes les tasques pendents
   */
  getPendingTasks(): Task[] {
    return this.tasksSignals().filter(task => !task.completed);
  }

  /**
   * Obté el número total de tasques
   */
  getTotalTasksCount(): number {
    return this.tasksSignals().length;
  }

  /**
   * Obté el número total de tasques completades
   */
  getCompletedTasksCount(): number {
    return this.getCompletedTasks().length;
  }

  /**
   * Neteja totes les tasques completades
   */
  clearCompletedTasks(): void {
    this.tasksSignals.update(tasks => 
      tasks.filter(task => !task.completed)
    );
    this.saveTasksToStorage();
  }

  /**
   * Neteja totes les tasques
   */
  clearAllTasks(): void {
    this.tasksSignals.set([]);
    this.nextId.set(1);
    this.saveTasksToStorage();
  }

  /**
   * Guarda les tasques al localStorage
   */
  private saveTasksToStorage(): void {
    try {
      const tasksData = {
        tasks: this.tasksSignals(),
        nextId: this.nextId()
      };
      localStorage.setItem('todolist-tasks', JSON.stringify(tasksData));
    } catch (error) {
      console.error('Error al guardar les tasques al localStorage:', error);
    }
  }

  /**
   * Carrega les tasques desde el localStorage
   */
  private loadTasksFromStorage(): void {
    try {
      const stored = localStorage.getItem('todolist-tasks');
      if (stored) {
        const tasksData = JSON.parse(stored);

        //Convertir les dates de string a Date
        const tasks = tasksData.tasks.map((task: any) => ({...task, createdAt: new Date(task.createdAt)}));

        this.tasksSignals.set(tasks);
        this.nextId.set(tasksData.nextId || tasks.length + 1);
      }
    } catch (error) {
      console.error('Error al carregar les tasques desde el localStorage', error);
      //Si tenim un error començarem amb un array buit
      this.tasksSignals.set([]);
      this.nextId.set(1);
    }
  }
}
