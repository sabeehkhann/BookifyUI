import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './components/nav/nav.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BooksComponent } from './components/books/books.component';
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { BookShopsComponent } from './components/book-shops/book-shops.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    BooksComponent,
    CreateBookComponent,
    BookShopsComponent,
    AuthorsComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    RouterModule.forRoot([
      { path: "", component: NavComponent, children: [
        { path: 'login', component: LoginComponent},
        { path: 'signup', component: SignupComponent },
        { path: 'categories', component: CategoriesComponent }
      ]
    },
    { path: '**', component: NavComponent}
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
