import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly LANGUAGES = {
    EN: 'en',
    RU: 'ru'
  };

  readonly LANGUAGE_NAMES = {
    [this.LANGUAGES.EN]: "En",
    [this.LANGUAGES.RU]: "Ру",
  }

  constructor(private translateService: TranslateService) {}

  setLanguage (language: string) {
    this.translateService.use(language);
  }

  getLanguage () {
    return this.translateService.currentLang;
  }

  getLanguageName () {
    return this.LANGUAGE_NAMES[this.translateService.currentLang];
  }
}
