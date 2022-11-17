import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListUserPageComponent } from './user-list-user-page.component';

describe('UserListUserPageComponent', () => {
  let component: UserListUserPageComponent;
  let fixture: ComponentFixture<UserListUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
