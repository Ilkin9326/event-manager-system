// angular import
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export default class LoginComponent implements OnInit, OnDestroy {
  logoWidh:string = "450px";
  signInForm: FormGroup;
  userEmail:string;
  userPsw:string;
  authservice:AuthService = inject(AuthService);
  constructor(private route: Router, private fb: FormBuilder) {
  }

  submitForm():void{
    this.userEmail=this.signInForm.get('email').value;
    this.userPsw = this.signInForm.get('password').value;
    //this.route.navigate(['/sample-page']);
    this.authservice.postLogin(this.userEmail, this.userPsw);
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  ngOnDestroy(): void {
  }
}
