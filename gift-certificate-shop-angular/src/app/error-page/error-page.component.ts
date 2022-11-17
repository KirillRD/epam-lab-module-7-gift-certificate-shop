import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorEnum } from '../error/error-enum';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  message!: string;
  code!: number;
  status!: number;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    let message = localStorage.getItem("message");
    let code = Number(localStorage.getItem("code"));
    let status = Number(localStorage.getItem("status"));

    if (message && code && status && ErrorEnum.containsByCode(code)) {
      if (this.hasTranslate(message)) {
        this.setTranslate(message);
      } else {
        this.message = message;
      }
      this.code = code;
      this.status = status;

      localStorage.removeItem("message");
      localStorage.removeItem("code");
      localStorage.removeItem("status");
    } else {
      this.setTranslate("error.404");
      this.code = 404_000;
      this.status = 404;
    }
  }

  hasTranslate(message: string): boolean {
    const translation = this.translateService.instant(message);
    return translation !== message && translation !== '';
  }

  setTranslate(message: string) {
    this.translateService.stream(message).subscribe(
      translate => {
        this.message = translate;
      }
    );
  }
}
