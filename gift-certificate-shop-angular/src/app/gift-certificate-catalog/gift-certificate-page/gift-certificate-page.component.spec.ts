import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificatePageComponent } from './gift-certificate-page.component';

describe('GiftCertificatePageComponent', () => {
  let component: GiftCertificatePageComponent;
  let fixture: ComponentFixture<GiftCertificatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
