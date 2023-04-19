import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {diff} from 'ngx-bootstrap/chronos/moment/diff';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeDetails: any;

  constructor(private dialogRef: MatDialogRef<EmployeeDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.employeeDetails = this.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
