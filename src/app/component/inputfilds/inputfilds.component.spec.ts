import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputfildsComponent } from './inputfilds.component';

describe('InputfildsComponent', () => {
  let component: InputfildsComponent;
  let fixture: ComponentFixture<InputfildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputfildsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputfildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
