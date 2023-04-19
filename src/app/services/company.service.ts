import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  addCompany(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/company', data);
  }

  getCompanyList(): Observable<any> {
    return this.http.get('http://localhost:3000/company');
  }

  getCompany(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/company/' + id);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/company/' + id);
  }

  updateCompany(id: number, data: any): Observable<any> {
    return this.http.put('http://localhost:3000/company/' + id, data);

  }
}
