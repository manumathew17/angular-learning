import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiURL = 'http://127.0.0.1:8000/api/v1/customer';

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer> {
    return this.http.get<Customer>(this.apiURL);

  }


}
