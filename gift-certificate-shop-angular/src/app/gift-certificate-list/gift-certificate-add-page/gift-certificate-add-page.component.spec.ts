import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateAddPageComponent } from './gift-certificate-add-page.component';

describe('GiftCertificateAddPageComponent', () => {
  let component: GiftCertificateAddPageComponent;
  let fixture: ComponentFixture<GiftCertificateAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
