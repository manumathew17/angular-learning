import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(http: HttpClient) {
  }

  async ProceedLogin(userName: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem('token', 'test');
        resolve(true);
      }, 3000);
    });
  }


  isLoggedIn = () => localStorage.getItem('token') != null;

  getToken = () => localStorage.getItem('token') != null ? localStorage.getItem('token') : '';
}
