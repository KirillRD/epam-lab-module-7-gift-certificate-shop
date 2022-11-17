import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list-search-box',
  templateUrl: './user-list-search-box.component.html',
  styleUrls: ['./user-list-search-box.component.scss']
})
export class UserListSearchBoxComponent implements OnInit {

  @Input()
  set search(search: string) {
    this.searchForm.setValue(search);
  }

  searchForm: FormControl = new FormControl();

  @Output() searchSubmitEvent = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void { }

  submitForm() {
    let searchParams: any = {
      search: this.searchForm.value
    };

    this.searchSubmitEvent.emit(searchParams);
  }
}
