import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inValid = false;

  constructor(private _formBuilder: FormBuilder, private service: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  formGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
    let user = localStorage.getItem('User');

    if(user == null){
      
    }

  }

  Submit(){
    let username = this.formGroup.controls.email.value;
    let password = this.formGroup.controls.password.value;

    this.service.login(username, password)
      .subscribe({
        next: (res: any) => {
          if(res == null){
            this.inValid = true;
          }
          else{
            this.inValid = false;

            this._snackBar.open('Welcome ' + res.firstName + ' ' + res.lastName, 'Done', {
              duration: 3000
            })
            
            localStorage.setItem('User', JSON.stringify(res));

            this.router.navigate(['/welcome']);
          }
        }
      })
  }
}
