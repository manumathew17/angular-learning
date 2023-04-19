import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Education} from '../model/education';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../services/employee.service';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {


  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddNewComponent>,
              private empServices: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        dob: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        education: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        experience: new FormControl('', Validators.required),
        package: new FormControl('', Validators.required),
      }
    );
  }

  empForm: FormGroup;
  today = new Date();


  educations: string[] = [
    'School',
    'Diploma',
    'Graduate',
    'Post-Graduate'
  ];

  companies: string[] = [
    'Google',
    'ms',
    'paypal',
    'zoho'
  ];


  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  onFormSubmit = () => {
    if (this.empForm.valid) {
      if (this.data) {
        this.empServices.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (value: any) => {
            this.dialogRef.close();
            alertify.success('done');
          },
          error: (err: any) => {
            alertify.error(err.toString());
          },
        });
      } else {
        this.empServices.addEmployee(this.empForm.value).subscribe({
          next: (value: any) => {
            this.dialogRef.close();
            alertify.success('done');

          },
          error: (err: any) => {
            alertify.error(err.toString());
          },
        });
      }

    }
  };


  closeDialog() {
    console.log('close');
    this.dialogRef.close();
  }
}
