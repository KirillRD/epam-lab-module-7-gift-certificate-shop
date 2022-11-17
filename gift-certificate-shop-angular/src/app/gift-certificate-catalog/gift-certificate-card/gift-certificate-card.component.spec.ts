import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateCardComponent } from './gift-certificate-card.component';

describe('GiftCertificateCardComponent', () => {
  let component: GiftCertificateCardComponent;
  let fixture: ComponentFixture<GiftCertificateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
