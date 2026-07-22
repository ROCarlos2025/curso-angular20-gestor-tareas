import { computed, effect, Injectable, signal } from '@angular/core';
import { Task } from './task';

const STORAGE_KEY = 'tareas';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  tareas = signal<Task[]>(this.cargar());

  pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);

  hayCompletadas = computed(() => this.tareas().some((t) => t.completada));

  /**
   * Crea una nueva instancia de TaskStore y establece un efecto para guardar las tareas en el almacenamiento local cada vez que cambian.
   */
  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas()));
    });
  }

  /**
   * Agrega una nueva tarea con el título proporcionado.
   * @param titulo El título de la nueva tarea.
   * @returns void
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
   * Elimina una tarea por su ID.
   * @param id El ID de la tarea a eliminar.
   */
  eliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  /**
   * Alterna el estado de completada de una tarea por su ID.
   * @param id El ID de la tarea a alternar.
   */
  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }

  /** Carga las tareas desde el almacenamiento local o devuelve las tareas por defecto.
   * @returns {Task[]} Las tareas cargadas desde el almacenamiento local o las tareas por defecto.
   */
  private cargar(): Task[] {
    const guardadas = localStorage.getItem(STORAGE_KEY);

    if (guardadas) {
      return JSON.parse(guardadas);
    }
    return [
      { id: 1, titulo: 'Aprender angular', completada: false },
      { id: 2, titulo: 'Construir un proyecto nuevo', completada: false },
      { id: 3, titulo: 'Dominar signals', completada: true },
    ];
  }

  /**
   * Elimina todas las tareas completadas de la lista.
   * @returns void
   */
  public limpiarCompletadas(): void {
    this.tareas.update((lista) => lista.filter((t) => !t.completada));
  }
}
