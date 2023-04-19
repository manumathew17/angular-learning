import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoadingDialogComponent} from '../../loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private dialogRef: MatDialogRef<LoadingDialogComponent>; // Variable to hold the reference to the loading dialog

  constructor(private dialog: MatDialog) {
  }

  // Method to open the loading dialog
  open(): void {
    this.dialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
    });
  }

  // Method to close the loading dialog
  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
