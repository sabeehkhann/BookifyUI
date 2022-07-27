import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookShopsComponent } from './book-shops.component';

describe('BookShopsComponent', () => {
  let component: BookShopsComponent;
  let fixture: ComponentFixture<BookShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookShopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
