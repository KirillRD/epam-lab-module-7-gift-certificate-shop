import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderRowComponent } from './user-order-row.component';

describe('UserOrderRowComponent', () => {
  let component: UserOrderRowComponent;
  let fixture: ComponentFixture<UserOrderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
