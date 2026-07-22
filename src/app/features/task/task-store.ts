import { signal, computed, Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  tareas = signal<Task[]>([
    { id: 1, titulo: 'Aprender angular', completada: false },
    { id: 2, titulo: 'Construir un proyecto nuevo', completada: false },
    { id: 3, titulo: 'Dominar signals', completada: true },
  ]);

  /**
   * Computed property que devuelve el número de tareas pendientes.
   * Esta propiedad se actualiza automáticamente cuando cambia la lista de tareas.
   */
  pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);

  /**
   * Metodo para agregar una nueva tarea a la lista
   *
   * @param {string} titulo
   * @memberof App
   */
  agregar(titulo: string): void {
    const limpio = titulo.trim();
    if (!limpio) {
      return;
    }

    this.tareas.update((lista) => [
      ...lista,
      { id: Date.now(), titulo: limpio, completada: false },
    ]);
  }

  /**
   * Metodo para eliminar una tarea de la lista
   *
   * @param {number} id
   * @memberof App
   */
  eliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  /**
   * Metodo para alternar el estado de completada de una tarea.
   *
   * @param {number} id
   * @memberof App
   */
  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }
}
