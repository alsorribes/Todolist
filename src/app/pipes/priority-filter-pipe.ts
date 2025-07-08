import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'priorityFilter',
  standalone: true,
})
export class PriorityFilterPipe implements PipeTransform {

  transform(tasks: Task[], priority: 'all' | 'Alta' | 'Mitjana' | 'Baixa'): Task[] {
    if (!tasks) return [];

    if (priority === 'all') {
      return tasks;
    } else {
      return tasks.filter(t => t.priority === priority);
    }
  }
}