import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListSearchBoxComponent } from './tag-list-search-box.component';

describe('TagListSearchBoxComponent', () => {
  let component: TagListSearchBoxComponent;
  let fixture: ComponentFixture<TagListSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagListSearchBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagListSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
