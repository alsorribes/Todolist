//Fitxer per controlar l'estat de les tasques entre totes, pendents i completades amb l'ajuda de pipes
import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskStatusFilter',
  standalone: true
})
export class TaskStatusFilterPipe implements PipeTransform {

  //Filtrem les tasques pel seu estat i retornem les que ens convinguin
  transform(tasks: Task[], filter: 'all' | 'completed' | 'pending'): Task[]  {
    if (!tasks) return [];

    if (filter === 'completed') {
      return tasks.filter( t => t.completed);
    } else if (filter === 'pending') {
      return tasks.filter(t => !t.completed);
    } else {
      return tasks;
    }
  }
}