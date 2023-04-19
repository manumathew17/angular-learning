import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../services/company.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoadingDialogComponent} from '../loading-dialog/loading-dialog.component';
import {LoadingService} from '../services/ui/loading.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  loadingDialogRef: MatDialogRef<LoadingDialogComponent>;

  constructor(private formBuilder: FormBuilder, private service: CompanyService, private snackBar: MatSnackBar, private loadingDialog: LoadingService) {
    this.companyForm = this.formBuilder.group({
        companyName: ['', [Validators.required, Validators.maxLength(50)]],
        companyAddress: new FormControl(''),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)])),
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]]
      }
    );
  }


  ngOnInit(): void {
  }


  onFormSubmit() {
    const config = new MatSnackBarConfig();
    if (this.companyForm.valid) {
      const companyDetails = this.companyForm.value;
      companyDetails.createdAt = Date();
      console.log(companyDetails);
      this.loadingDialog.open();
      this.service.addCompany(companyDetails).subscribe({
        next: (value: any) => {
          this.loadingDialog.close();
          this.openSuccessSnackBar('Success');
          this.companyForm.markAsUntouched();
          this.companyForm.reset();

        },
        error: (err: any) => {
          this.loadingDialog.close();
          this.openErrorSnackBar('Error on saving');
          config.duration = 5000;
          config.horizontalPosition = 'right';
          config.verticalPosition = 'bottom';
          config.panelClass = ['error-snackbar'];
          this.snackBar.open('Failed to insert', 'retry', config);

        },
      });
    } else {
      this.openWarningSnackBar('Please enter valid details');
    }

  }


  getEmailErrorMessage() {
    if (this.companyForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.companyForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getCompanyNameError() {
    if (this.companyForm.controls.companyName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.companyForm.controls.companyName.hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    if (this.companyForm.controls.phoneNumber.hasError('required')) {
      return 'You must enter a value';
    }
    return this.companyForm.controls.phoneNumber.hasError('pattern') ? 'Invalid phone number' : '';
  }


  // number validator
  numberValidator(control: AbstractControl): { [key: string]: any } | null {

    const input = control.value;
    if (input && isNaN(input)) {
      // If input is not a number, return an error object
      return {number: true};
    }
    // If input is a number, return null (no errors)
    return null;
  }

  validateMaxLength(maxLength: number) {
    return (control) => {
      const inputValue = control.value;
      if (inputValue && inputValue.length > maxLength) {
        return {maxLengthExceeded: true};
      }
      return null;
    };
  }


  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snack-bar'],
    });
  }

  openWarningSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['warn-snack-bar'],
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snack-bar'],
    });
  }

}
