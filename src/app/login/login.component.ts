import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
// import { AuthService,SocialUser, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from 'ng4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public user:any=SocialUser;
  // constructor(private socialAuthService:SocialAuthService) {}
  constructor() {}

  // googleLogin(){
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
  //     this.user=userData;
  //   });
  // }
  ngOnInit():void{
  
  }
}
