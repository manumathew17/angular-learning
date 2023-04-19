import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CompanyService} from '../services/company.service';
import {LoadingService} from '../services/ui/loading.service';
import {Route, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements AfterViewInit {


  constructor(private companyService: CompanyService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private loadingDialog: LoadingService, private router: Router) {
  }


  displayedColumns: string[] = ['id', 'companyName', 'email', 'phoneNumber', 'createdAt', 'action', 'details'];
  companyList: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit(): void {
    this.getCompanyList();
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyList.filter = filterValue.trim().toLowerCase();

    if (this.companyList.paginator) {
      this.companyList.paginator.firstPage();
    }
  }

  private getCompanyList(): void {
    this.loadingDialog.open();
    this.companyService.getCompanyList().subscribe({
      next: (res) => {
        this.loadingDialog.close();
        this.companyList = new MatTableDataSource(res);
        this.companyList.sort = this.sort;
        this.companyList.paginator = this.paginator;

      },
      error: (err) => {
        this.loadingDialog.close();
        alert('error');
      },
    });


  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.confirmClicked.subscribe(() => {
      this.deleteCompanyById(id);
    });
  }

  deleteCompanyById(id: number): void {
    this.loadingDialog.open();
    this.companyService.deleteCompany(id).subscribe({
      next: (res) => {
        this.loadingDialog.close();
        this.openSuccessSnackBar('Deleted');
        this.getCompanyList();

      },
      error: (err) => {
        this.loadingDialog.close();
        this.loadingDialog.close();
        this.openErrorSnackBar('Failed to delete');
      },
    });


  }

  routeToDetails(companyId): void {
    const queryParams: any = {
      id: companyId
    };
    this.router.navigate(['/company'], {queryParams});
  }


  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snack-bar'],
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snack-bar'],
    });
  }

}
