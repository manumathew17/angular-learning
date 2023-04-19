import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) {
  }

  reactiveForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.compose([Validators.required, Validators.min(5)])),
      userPassword: new FormControl('', Validators.compose([Validators.required, Validators.email]))


    }
  );

  ngOnInit(): void {
  }

  openLogin() {
    this.router.navigate(['login']);
  }

  saveUser() {
    this.reactiveForm.get('userName').setErrors({
      required: 'Username is required',
      minlength: 'Username must be at least 3 characters',
      customError: 'Custom error message'
    });
    console.log(this.reactiveForm.value);


  }
}
