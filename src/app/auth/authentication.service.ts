import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userName:any;
  headers=new HttpHeaders().set('content-type','application/json');
  constructor(private http:HttpClient,private router:Router) { }

  public get isUserLoggedIn(){
    return !!(localStorage.getItem('auth'));
  }
  public get userDetails(){
    return (localStorage.getItem('auth'));
  }
  public signIn(email:string,password:string){
     this.http.post(`${environment.nodeUri}/signin`,{email,password},{headers:this.headers}).subscribe((res:any)=>{
      localStorage.setItem('auth',JSON.stringify(res));
      this.router.navigate(['/home']);

    },(error)=>{
      console.log('Error occuring while calling login()',error.message);
      localStorage.clear();
    })
  }
}
