import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public languageService: LanguageService, public userDataService: UserDataService) { }

  ngOnInit(): void {
  }

}
