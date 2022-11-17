import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateEditPageComponent } from './gift-certificate-edit-page.component';

describe('GiftCertificateEditPageComponent', () => {
  let component: GiftCertificateEditPageComponent;
  let fixture: ComponentFixture<GiftCertificateEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
