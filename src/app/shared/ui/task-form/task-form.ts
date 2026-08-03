import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  agregado = output<string>();

  titulo = signal('');

  agregar(): void {
    const limpio = this.titulo().trim();
    if (!limpio) return;
    this.agregado.emit(limpio);
    this.titulo.set('');
  }
}
