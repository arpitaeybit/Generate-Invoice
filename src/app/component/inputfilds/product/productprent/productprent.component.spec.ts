import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductprentComponent } from './productprent.component';

describe('ProductprentComponent', () => {
  let component: ProductprentComponent;
  let fixture: ComponentFixture<ProductprentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductprentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductprentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
