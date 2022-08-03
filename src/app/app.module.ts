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
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CreateBookShopComponent } from './components/create-book-shop/create-book-shop.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ThankyouPageComponent } from './components/thankyou-page/thankyou-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BookViewComponent } from './components/book-view/book-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxHttpLoaderModule } from 'ngx-http-loader';
import {MatDividerModule} from '@angular/material/divider';
import { BookshopViewComponent } from './components/bookshop-view/bookshop-view.component';
import { DeleteBookDialogComponent } from './components/delete-book-dialog/delete-book-dialog.component';


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
    CreateBookShopComponent,
    CreateAuthorComponent,
    ThankyouPageComponent,
    WelcomePageComponent,
    BookViewComponent,
    BookshopViewComponent,
    DeleteBookDialogComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    NgxHttpLoaderModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: NavComponent, children: [
        { path: 'login', component: LoginComponent},
        { path: 'signup', component: SignupComponent },
        { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuardService]},
        { path: 'books', component: BooksComponent, canActivate: [AuthGuardService]},
        { path: 'createbook', component: CreateBookComponent, canActivate: [AuthGuardService]},
        { path: 'createbook/:id', component: CreateBookComponent, canActivate: [AuthGuardService]},
        { path: 'createbookshop', component: CreateBookShopComponent, canActivate: [AuthGuardService]},
        { path: 'createbookshop/:id', component: CreateBookShopComponent, canActivate: [AuthGuardService]},
        { path: 'bookshops', component: BookShopsComponent, canActivate: [AuthGuardService]},
        { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuardService]},
        { path: 'createauthor', component: CreateAuthorComponent, canActivate: [AuthGuardService]},
        { path: 'bookview', component: BookViewComponent, canActivate: [AuthGuardService]},
        { path: 'thankyou', component: ThankyouPageComponent,},
        { path: 'welcome', component: WelcomePageComponent},
      ]
    },
    { path: '**', component: NavComponent}
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
