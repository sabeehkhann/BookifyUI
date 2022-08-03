import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshopViewComponent } from './bookshop-view.component';

describe('BookshopViewComponent', () => {
  let component: BookshopViewComponent;
  let fixture: ComponentFixture<BookshopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshopViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookshopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
