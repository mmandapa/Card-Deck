import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../../shared/models/card.model'; 

@Component({
  selector: 'app-card-dealt-dialog',
  standalone: true,
  templateUrl: './card-dealt-dialog.component.html',
  styleUrls: ['./card-dealt-dialog.component.scss']
})
export class CardDealtDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { dealtCards: Card[] }) {}
}
