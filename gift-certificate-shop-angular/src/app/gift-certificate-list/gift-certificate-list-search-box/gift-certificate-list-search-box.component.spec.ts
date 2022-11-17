import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateListSearchBoxComponent } from './gift-certificate-list-search-box.component';

describe('GiftCertificateListSearchBoxComponent', () => {
  let component: GiftCertificateListSearchBoxComponent;
  let fixture: ComponentFixture<GiftCertificateListSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateListSearchBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateListSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
