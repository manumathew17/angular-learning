import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './gaurd/auth.guard';
import {ViewusersComponent} from './viewusers/viewusers.component';
import {ProfileComponent} from './profile/profile.component';
import {AddCompanyComponent} from './add-company/add-company.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {CompanyListComponent} from './company-list/company-list.component';
import {AddCompanyWithEmployeeComponent} from './add-company-with-employee/add-company-with-employee.component';
import {CompanyDetailsComponent} from './company-details/company-details.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'viewall', component: ViewusersComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'addCompany', component: AddCompanyComponent, canActivate: [AuthGuard]},
  {path: 'addEmployee', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'companyList', component: CompanyListComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddCompanyWithEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'company', component: CompanyDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
