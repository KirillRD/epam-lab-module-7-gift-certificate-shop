import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ErrorEnum } from 'src/app/error/error-enum';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { GlobalErrorHandler } from 'src/app/error/global-error-handler';

@Component({
  selector: 'app-tag-add-page',
  templateUrl: './tag-add-page.component.html',
  styleUrls: ['./tag-add-page.component.scss']
})
export class TagAddPageComponent implements OnInit {

  tagForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', {
      validators: [
        Validators.required,
        Validators.maxLength(45)
      ],
      asyncValidators: [
        this.nameValidator.bind(this)
      ]
    }]
  });
  nameExistsAlert: boolean = false;

  constructor(private tagService: TagService, private formBuilder: FormBuilder, private router: Router, private globalErrorHandler: GlobalErrorHandler) { }

  ngOnInit(): void {
  }

  submitForm(tag: Tag) {
    if (this.tagForm.invalid) {
      this.tagForm.markAllAsTouched();
      return;
    }

    this.tagService.createTag(tag).subscribe({
      error: (error) => {
        if (ErrorEnum.DUPLICATE.code == error.error.code) {
          this.nameExistsAlert = true;
        } else {
          this.globalErrorHandler.handleError(error);
        }
      },
      complete: () => {
        this.router.navigateByUrl('/tag-list');
      }
    });
  }

  nameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.tagService.existTagByName(control.value).pipe(
      map((existTag) => (existTag ? { nameExists: true } : null))
    );
  }

  closeNameExistsAlert() {
    this.nameExistsAlert = false;
  }
}
