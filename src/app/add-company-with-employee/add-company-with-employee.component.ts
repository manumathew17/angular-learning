import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {CompanyService} from '../services/company.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {LoadingService} from '../services/ui/loading.service';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-company-with-employee',
  templateUrl: './add-company-with-employee.component.html',
  styleUrls: ['./add-company-with-employee.component.css']
})
export class AddCompanyWithEmployeeComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  companyForm: FormGroup;
  designations: string[];
  skillRates: number[];
  today = new Date();
  visible = true;
  selectable = true;
  skillCtrl = new FormControl();
  filteredSkill: Observable<string[]>;
  selectedSkills: string[] = [];
  allSkills: string[];


  @ViewChild('skillInput')
  fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private formBuilder: FormBuilder, private service: CompanyService, private router: Router,
              private snackBar: MatSnackBar, private loadingDialog: LoadingService) {
    this.designations = ['Developer', 'Manager', 'System Admin', 'Team Lead', 'PM'];
    this.allSkills = ['Java', 'Angular', 'CSS', 'HTML', 'JavaScript', 'UI', 'SQL', 'React', 'PHP',
      'GIT', 'AWS', 'Python', 'Django', 'C', 'C++', 'C#', 'Unity', 'R', 'AI', 'NLP',
      'Photoshop', 'Nodejs'];

    this.skillRates = [0, 1, 2, 3, 4, 5];
    this.createCompanyForm();

  }


  ngOnInit(): void {
    this.filteredSkill = this.skillCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  private createCompanyForm(): void {
    this.companyForm = this.formBuilder.group({
        companyName: ['', [Validators.required, Validators.maxLength(50)]],
        companyAddress: new FormControl(''),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)])),
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]],
        empInfo: this.formBuilder.array([])
      }
    );
  }

  newEmployee(): FormGroup {
    return this.formBuilder.group({
      empName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      joinDate: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)])],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]],
      skillInfo: this.formBuilder.array([]),
      eductionInfo: this.formBuilder.array([])
    });

  }

  newSkill(): FormGroup {
    return this.formBuilder.group({
      skillName: ['', [Validators.required]],
      skillRating: ['', [Validators.required]]
    });
  }

  newEducation(): FormGroup {
    return this.formBuilder.group({
      instituteName: ['', [Validators.required]],
      courseName: ['', [Validators.required]],
      completedYear: ['', [Validators.required]]
    });

  }

  get employee(): FormArray {
    return this.companyForm.get('empInfo') as FormArray;
  }


  employeeSkill(empIndex: number): FormArray {
    return this.employee
      .at(empIndex)
      .get('skillInfo') as FormArray;
  }

  employeeEducation(empIndex: number): FormArray {
    return this.employee
      .at(empIndex)
      .get('eductionInfo') as FormArray;
  }

  addEmployee(): void {
    this.employee.push(this.newEmployee());
  }

  addEmployeeEducation(empIndex: number): void {
    this.employeeEducation(empIndex).push(this.newEducation());
  }

  addEmployeeSkill(empIndex: number): void {
    this.employeeSkill(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, empSkillIndex: number): void {
    this.employeeSkill(empIndex).removeAt(empSkillIndex);
  }

  removeEmployeeEducation(empIndex: number, educationIndex: number): void {
    this.employeeEducation(empIndex).removeAt(educationIndex);
  }

  removeEmployee(i: number): void {
    this.employee.removeAt(i);
  }


  onFormSubmit(): void {
    this.companyForm.markAllAsTouched();
    if (this.companyForm.valid) {
      const companyDetails = this.companyForm.value;
      companyDetails.createdAt = Date();
      console.log(JSON.stringify(companyDetails));
      this.loadingDialog.open();
      this.service.addCompany(companyDetails).subscribe({
        next: (value: any) => {
          console.log(value);
          this.loadingDialog.close();
          this.employee.clear();
          this.companyForm.reset();
          const queryParams: any = {
            id: value.id
          };
          this.openSuccessSnackBar('Success', queryParams);
          setTimeout(() =>
            this.formGroupDirective.resetForm(), 0);

          // this.createCompanyForm();
        },
        error: (err: any) => {
          this.loadingDialog.close();
          this.openErrorSnackBar('Error on saving');

        },
      });
    } else {
      this.openWarningSnackBar('Please enter valid details');
    }

  }


  // tslint:disable-next-line:typedef
  getEmailErrorMessage(email: AbstractControl) {
    if (email.hasError('required')) {
      return 'You must enter a value';
    }
    return email.hasError('email') ? 'Not a valid email' : '';
  }

  // tslint:disable-next-line:typedef
  getNameError(name: AbstractControl) {
    if (name.hasError('required')) {
      return 'You must enter a value';
    }
    return name.hasError('email') ? 'Not a valid email' : '';
  }

  // tslint:disable-next-line:typedef
  getPhoneErrorMessage(phoneNumber: AbstractControl) {
    if (phoneNumber.hasError('required')) {
      return 'You must enter a value';
    }
    return phoneNumber.hasError('pattern') ? 'Invalid phone number' : '';
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

  // tslint:disable-next-line:typedef
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

  openSuccessSnackBar(message: string, queryParams: any): void {
    const snackBarRef = this.snackBar.open(message, 'Show', {
      duration: 8000,
      panelClass: ['success-snack-bar'],
    });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/company'], {queryParams});
    });
  }

}
