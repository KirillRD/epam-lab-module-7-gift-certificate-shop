import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificateListComponent } from './gift-certificate-list.component';

describe('GiftCertificateListComponent', () => {
  let component: GiftCertificateListComponent;
  let fixture: ComponentFixture<GiftCertificateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
