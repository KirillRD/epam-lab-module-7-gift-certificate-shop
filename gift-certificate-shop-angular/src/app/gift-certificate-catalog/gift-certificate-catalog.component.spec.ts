import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateCatalogComponent } from './gift-certificate-catalog.component';

describe('GiftCertificateCatalogComponent', () => {
  let component: GiftCertificateCatalogComponent;
  let fixture: ComponentFixture<GiftCertificateCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
