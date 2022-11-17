import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAddPageComponent } from './tag-add-page.component';

describe('TagAddPageComponent', () => {
  let component: TagAddPageComponent;
  let fixture: ComponentFixture<TagAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
