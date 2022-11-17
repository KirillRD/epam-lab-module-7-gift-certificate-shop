import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tag-list-search-box',
  templateUrl: './tag-list-search-box.component.html',
  styleUrls: ['./tag-list-search-box.component.scss']
})
export class TagListSearchBoxComponent implements OnInit {

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
