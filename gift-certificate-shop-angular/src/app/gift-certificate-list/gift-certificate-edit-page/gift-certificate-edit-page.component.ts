import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/components/multi-dropdown/multi-dropdown.model';
import { GiftCertificate } from 'src/app/models/gift-certificate';
import { Tag } from 'src/app/models/tag';
import { GiftCertificateService } from 'src/app/services/gift-certificate.service';
import { TagService } from 'src/app/services/tag.service';
import { GlobalErrorHandler } from 'src/app/error/global-error-handler';
import { ErrorEnum } from 'src/app/error/error-enum';

@Component({
  selector: 'app-gift-certificate-edit-page',
  templateUrl: './gift-certificate-edit-page.component.html',
  styleUrls: ['./gift-certificate-edit-page.component.scss']
})
export class GiftCertificateEditPageComponent implements OnInit {

  showSearch = true;
  showError = false;
  showAll = true;
  showStatus = true;

  giftCertificate!: GiftCertificate;
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

  constructor(private giftCertificateService: GiftCertificateService, private tagService: TagService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private globalErrorHandler: GlobalErrorHandler) { }

  ngOnInit(): void {
    this.loadId();
  }

  loadId() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        let id = Number(params.get('id'));
        this.loadGiftCertificate(id);
      }
    );
  }

  loadGiftCertificate(id: number) {
    this.giftCertificateService.getGiftCertificateById(id).subscribe({
      next: (response) => {
        this.giftCertificate = response;
      },
      complete: () => {
        this.loadTagItems();
        this.loadGiftCertificateForm();
      }
    });
  }

  loadTagItems() {
    let ids: number[] = this.giftCertificate.tags.map(tag => tag.id);

    this.tagService.getAllTags().subscribe({
      next: (response) => {
        this.tagItems = response.map(
          tag => {
            let item: Item;

            if (ids.includes(tag.id)) {
              item = {
                id: tag.id,
                name: tag.name,
                checked: true
              } as Item;
            } else {
              item = {
                id: tag.id,
                name: tag.name
              } as Item;
            }

            return item;
          }
        );
      }
    });
  }

  loadGiftCertificateForm() {
    this.giftCertificateForm.setValue({
      id: this.giftCertificate.id,
      name: this.giftCertificate.name,
      price: this.giftCertificate.price,
      duration: this.giftCertificate.duration,
      description: this.giftCertificate.description
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

    this.giftCertificateService.updateGiftCertificate(giftCertificate).subscribe({
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
      map((existGiftCertificate) => ((existGiftCertificate && existGiftCertificate != this.giftCertificate.id) ? { nameExists: true } : null))
    );
  }

  closeNameExistsAlert() {
    this.nameExistsAlert = false;
  }
}
