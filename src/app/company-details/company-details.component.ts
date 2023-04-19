import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CompanyService} from '../services/company.service';
import {LoadingService} from '../services/ui/loading.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeDetailsComponent} from '../employee-details/employee-details.component';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['empName', 'designation', 'joinDate', 'email', 'phoneNumber', 'details'];
  dataSource: MatTableDataSource<any>;
  companyDetails: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CompanyService, private dialog: MatDialog,
              private loadingDialog: LoadingService, private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params.id;
      this.getCompanyDetails(id);

    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEmployeeDetails(data: any): void {
    this.dialog.open(EmployeeDetailsComponent, {data});
  }


  private getCompanyDetails(id: any): void {
    this.service.getCompany(id).subscribe({
      next: (res) => {
        this.companyDetails = res;
        this.dataSource = new MatTableDataSource(res.empInfo);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        alert('error');

      },
    });

  }
}
