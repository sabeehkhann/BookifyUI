import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookShopComponent } from './create-book-shop.component';

describe('CreateBookShopComponent', () => {
  let component: CreateBookShopComponent;
  let fixture: ComponentFixture<CreateBookShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBookShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
