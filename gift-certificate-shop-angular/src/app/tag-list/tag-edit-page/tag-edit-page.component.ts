import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { GlobalErrorHandler } from 'src/app/error/global-error-handler';
import { ErrorEnum } from 'src/app/error/error-enum';

@Component({
  selector: 'app-tag-edit-page',
  templateUrl: './tag-edit-page.component.html',
  styleUrls: ['./tag-edit-page.component.scss']
})
export class TagEditPageComponent implements OnInit {

  tag!: Tag;
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

  constructor(private tagService: TagService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private globalErrorHandler: GlobalErrorHandler) { }

  ngOnInit(): void {
    this.loadId();
  }

  loadId() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        let id = Number(params.get('id'));
        this.loadTag(id);
      }
    );
  }

  loadTag(id: number) {
    this.tagService.getTagById(id).subscribe({
      next: (response) => {
        this.tag = response;
      },
      complete: () => {
        this.loadTagForm();
      }
    });
  }

  loadTagForm() {
    this.tagForm.setValue({
      id: this.tag.id,
      name: this.tag.name
    });
  }

  submitForm(tag: Tag) {
    if (this.tagForm.invalid) {
      this.tagForm.markAllAsTouched();
      return;
    }

    this.tagService.updateTag(tag).subscribe({
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
