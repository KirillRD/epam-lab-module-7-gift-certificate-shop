import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/components/multi-dropdown/multi-dropdown.model';
import { ErrorEnum } from 'src/app/error/error-enum';
import { GiftCertificate } from 'src/app/models/gift-certificate';
import { Tag } from 'src/app/models/tag';
import { GiftCertificateService } from 'src/app/services/gift-certificate.service';
import { TagService } from 'src/app/services/tag.service';
import { GlobalErrorHandler } from 'src/app/error/global-error-handler';

@Component({
  selector: 'app-gift-certificate-add-page',
  templateUrl: './gift-certificate-add-page.component.html',
  styleUrls: ['./gift-certificate-add-page.component.scss']
})
export class GiftCertificateAddPageComponent implements OnInit {

  showSearch = true;
  showError = false;
  showAll = true;
  showStatus = true;

  tagItems: Item[] = [];
  giftCertificateForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', {
      validators: [
        Validators.required,
        Validators.maxLength(45)
      ],
      asyncValidators: [
        this.nameValidator.bind(this)
      ]
    }],
    price: ['', [
      Validators.required,
      Validators.pattern('^[1-9]([0-9]){0,4}(\\.([0-9]){1,2})?$')
    ]],
    duration: ['', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]*$')
    ]],
    description: ['', [
      Validators.required,
      Validators.maxLength(45)
    ]]
  });
  nameExistsAlert: boolean = false;

  constructor(private giftCertificateService: GiftCertificateService, private tagService: TagService, private formBuilder: FormBuilder, private router: Router, private globalErrorHandler: GlobalErrorHandler) { }

  ngOnInit(): void {
    this.loadTagItems();
  }

  loadTagItems() {
    this.tagService.getAllTags().subscribe({
      next: (response) => {
        this.tagItems = response.map(
          tag => ({
            id: tag.id,
            name: tag.name
          } as Item)
        );
      }
    });
  }

  submitForm(giftCertificate: GiftCertificate) {
    this.tagsValidator();
    if (this.giftCertificateForm.invalid || this.showError) {
      this.giftCertificateForm.markAllAsTouched();
      return;
    }

    let tags: Array<Tag> = this.getCheckedTags();

    giftCertificate.tags = tags;

    this.giftCertificateService.createGiftCertificate(giftCertificate).subscribe({
      error: (error) => {
        if (ErrorEnum.DUPLICATE.code == error.error.code) {
          this.nameExistsAlert = true;
        } else {
          this.globalErrorHandler.handleError(error);
        }
      },
      complete: () => {
        this.router.navigateByUrl('gift-certificate-list');
      }
    });
  }

  getCheckedTags(): Array<Tag> {
    return this.tagItems.filter(item => item.checked).map(
      item => ({
        id: item.id,
        name: item.name
      } as Tag)
    );
  }

  tagsValidator() {
    this.showError = this.getCheckedTags().length == 0;
  }

  nameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.giftCertificateService.existGiftCertificateByName(control.value).pipe(
      map((existGiftCertificate) => (existGiftCertificate ? { nameExists: true } : null))
    );
  }

  closeNameExistsAlert() {
    this.nameExistsAlert = false;
  }
}
