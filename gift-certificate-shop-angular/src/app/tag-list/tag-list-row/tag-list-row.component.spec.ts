import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListRowComponent } from './tag-list-row.component';

describe('TagListRowComponent', () => {
  let component: TagListRowComponent;
  let fixture: ComponentFixture<TagListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagListRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
