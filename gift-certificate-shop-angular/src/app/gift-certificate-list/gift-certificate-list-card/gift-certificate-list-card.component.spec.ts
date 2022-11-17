import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateListCardComponent } from './gift-certificate-list-card.component';

describe('GiftCertificateListCardComponent', () => {
  let component: GiftCertificateListCardComponent;
  let fixture: ComponentFixture<GiftCertificateListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
