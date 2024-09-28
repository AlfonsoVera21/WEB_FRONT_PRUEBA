import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-dialogo',
  standalone: true,
  imports: [],
  templateUrl: './confirmar-dialogo.component.html',
  styleUrl: './confirmar-dialogo.component.scss'
})
export class ConfirmarDialogoComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarDialogoComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
