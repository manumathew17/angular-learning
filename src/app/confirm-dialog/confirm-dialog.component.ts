import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Output() confirmClicked = new EventEmitter<void>();

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.confirmClicked.emit();
    this.dialogRef.close();
  }


}
