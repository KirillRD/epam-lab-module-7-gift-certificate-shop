import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSearchBoxComponent } from './user-list-search-box.component';

describe('UserListSearchBoxComponent', () => {
  let component: UserListSearchBoxComponent;
  let fixture: ComponentFixture<UserListSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListSearchBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
