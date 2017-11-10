import {Component, OnInit} from "@angular/core";
import {selector} from "rxjs/operator/publish";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication/authentication.component";

@Component({
  selector : 'app-login',
  moduleId : module.id,
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any = {};
  loading = false;
  error = '';

  constructor(private router:Router,private authenticationService : AuthenticationService){

  }
  ngOnInit(){
    this.authenticationService.logout();

  }
  login(){
    this.loading = true;
    this.authenticationService.login(this.model.username,this.model.password).subscribe(result => {
      if(result === true){
        this.router.navigate(['courses']);
      }else{
        this.error = 'Username or password is incorrect';
        this.loading =false;
      }
    },error =>{
      this.loading = false;
      this.error = error;
      });
  }

}
