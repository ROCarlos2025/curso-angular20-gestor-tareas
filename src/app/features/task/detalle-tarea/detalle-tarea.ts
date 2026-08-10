import { Component, computed, inject, input } from '@angular/core';
import { TaskStore } from '../task-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-tarea',
  imports: [RouterLink],
  templateUrl: './detalle-tarea.html',
  styleUrl: './detalle-tarea.css',
})
export class DetalleTarea {
  private storage = inject(TaskStore);

  id = input.required<string>();

  // buscar en el store la tarea con el id que llega por input
  tarea = computed(() => this.storage.tareas().find((t) => t.id === +this.id));
}
