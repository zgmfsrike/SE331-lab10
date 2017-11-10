import { Component, OnInit } from '@angular/core';
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationService  {
  private  authUrl ='http://localhost:8080/auth';
  private  headers = new Headers({'Content-Type': 'application/json'})

  constructor(private http:Http){}

  login(username:string,password:string):Observable<boolean>{
    return this.http.post(this.authUrl,JSON.stringify({username:username,password:password}),{headers:this.headers}).map((response:Response) => {
      let token = response.json() && (response.json() as any).token;
      if(token){
        localStorage.setItem('currentUser',JSON.stringify({username:username,token:token}));
        return true
      }else {
        return false;
      }
    }).catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getToken():string{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token:"";
  }
  logout():void{
    localStorage.removeItem('currentUser');
  }
  ngOnInit() {
  }

}
