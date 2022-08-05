import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { UserService } from 'src/app/services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },

  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})

export class SignupComponent implements OnInit {
  panelOpenState = false;

  constructor(private _formBuilder: FormBuilder, private _service: UserService, private _snackBar: MatSnackBar, private router: Router) { }

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', [Validators.min(18), Validators.max(99)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    addressLine1: ['', Validators.required],
    addressLine2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    owner: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.min(100), Validators.max(999)]],
    expiryDate: [moment(), Validators.required],
  });
  isLinear = true;

  ngOnInit(): void {
    // this._service.getUsers()
    // .subscribe({
    //   next: (response) => {
    //       this.authors = response;
    //       console.log(this.authors);
    //   }
    // })
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.thirdFormGroup.controls.expiryDate.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.thirdFormGroup.controls.expiryDate.setValue(ctrlValue);
    datepicker.close();
  }

  submitForm() {
    let user = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    }

    this._service.createUser(user)
    .subscribe({
        next: response => {
          
          this._snackBar.open('User Created', 'Done', {
            duration: 3000
          })

          this.router.navigate(['/thankyou']);
          // basicInfo = response.valueOf();
        },
    })
  }
}
export class User {
  Id?: number;
  FirstName?: string;
  LastName?: string;
  Age?: number;
  Email?: string;
  Password?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Owner?: string;
  CardNumber?: number;
  Cvv?: number;
  ExpiryDate?: Date;
}


