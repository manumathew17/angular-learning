import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddNewComponent} from './add-new/add-new.component';
import {AuthGuard} from './gaurd/auth.guard';
import {LoginService} from './services/login.service';
import {EMAIL, USER_NAME} from './configs/constatnts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  title = 'demoproject';
  isLoggedIn = false;
  userName = '';
  email = '';

  constructor(private router: Router, private dialog: MatDialog, private services: LoginService) {
  }


  ngOnInit(): void {
    if (!this.services.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // this.router.navigate(['/home']);
      this.email = EMAIL;
      this.userName = USER_NAME;
    }
  }


  ngDoCheck(): void {
    const currrentUrl = this.router.url;
    this.isLoggedIn = currrentUrl !== '/login';


  }

  openOrEditForm = () => {
    const dialogRef = this.dialog.open(AddNewComponent);
    // dialogRef.afterClosed().subscribe(() => {
    //   this.dialogService.closeDialog();
    // });
  };

  logOut = () => {
    localStorage.clear();
    this.router.navigate(['/login']);
  };


  navigateTo(navigationRoute: string) {
    this.router.navigate([navigationRoute], { replaceUrl: true });

  }
}
