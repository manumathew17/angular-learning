import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Customer} from '../model/customer';
import {HomeService} from '../services/home.service';
import {EmployeeService} from '../services/employee.service';
import {MatSort} from '@angular/material/sort';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddNewComponent} from '../add-new/add-new.component';
import * as alertify from 'alertifyjs';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private service: HomeService, private empService: EmployeeService, private dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
  }

}


