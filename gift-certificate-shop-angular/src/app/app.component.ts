import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gift-certificate-shop-angular';

  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    translateService.addLangs(Object.values(this.languageService.LANGUAGES));
    translateService.setDefaultLang(this.languageService.LANGUAGES.EN);
    translateService.use(this.languageService.LANGUAGES.EN);
  }
}
