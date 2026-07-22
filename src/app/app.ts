import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskStore } from './features/task/task-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Gestor de tareas';
  public storage = inject(TaskStore);
}
