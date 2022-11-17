import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditPageComponent } from './tag-edit-page.component';

describe('TagEditPageComponent', () => {
  let component: TagEditPageComponent;
  let fixture: ComponentFixture<TagEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
