import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../services/ui/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private services: LoginService, private route: Router, private loadingDialog: LoadingService) {
  }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.compose([Validators.required]))
  });


  ngOnInit(): void {
    localStorage.clear();
  }


  openRegistration = () => {
    this.route.navigate(['register']);
  };

  login = () => {
    this.loginForm.markAllAsTouched();
    console.log(this.loginForm.get('userName').value);
    if (this.loginForm.valid) {
      this.loadingDialog.open();
      this.services.ProceedLogin(this.loginForm.get('userName').value, this.loginForm.get('userPassword').value).then(r => {
        if (r) {
          this.loadingDialog.close();
          this.route.navigate(['home'], {replaceUrl: true});
        }
      });
    }


  };
}
