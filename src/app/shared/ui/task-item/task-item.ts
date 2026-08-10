import { Component, input, output } from '@angular/core';
import { Task } from '../../../features/task/task';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-item',
  imports: [RouterLink],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<Task>();

  //Esto emitira eventos hacia el componente padre, en este caso task-list
  toogle = output<number>();
  //Esto emitira eventos hacia el componente padre, para que elimine la tarea de la lista
  removed = output<number>();
}
