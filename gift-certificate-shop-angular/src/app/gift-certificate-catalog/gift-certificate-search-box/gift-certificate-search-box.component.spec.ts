import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateSearchBoxComponent } from './gift-certificate-search-box.component';

describe('GiftCertificateSearchBoxComponent', () => {
  let component: GiftCertificateSearchBoxComponent;
  let fixture: ComponentFixture<GiftCertificateSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateSearchBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
