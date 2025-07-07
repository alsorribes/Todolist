import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatusFilter'
})
export class TaskStatusFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
