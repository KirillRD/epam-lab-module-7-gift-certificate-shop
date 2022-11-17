import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Item } from 'src/app/components/multi-dropdown/multi-dropdown.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-gift-certificate-search-box',
  templateUrl: './gift-certificate-search-box.component.html',
  styleUrls: ['./gift-certificate-search-box.component.scss']
})
export class GiftCertificateSearchBoxComponent implements OnInit {

  tagsSelectShowSearch = true;
  tagsSelectShowError = false;
  tagsSelectShowAll = true;
  tagsSelectShowStatus = true;
  tagsSelectPlaceholder = "pages.gift-certificate.catalog.search-box.tags-select-placeholder";

  sortSelectShowSearch = false;
  sortSelectShowError = false;
  sortSelectShowAll = false;
  sortSelectShowStatus = false;
  sortSelectPlaceholder = "pages.gift-certificate.catalog.search-box.sort-select-placeholder";

  sortValues: Map<number, string> = new Map<number, string>([
    [1, "name-asc"],
    [2, "name-desc"],
    [3, "create-date-asc"],
    [4, "create-date-desc"],
    [5, "last-update-date-asc"],
    [6, "last-update-date-desc"]
  ]);

  @Input()
  set search(search: string) {
    this.searchForm.setValue(search);
  }

  @Input()
  set tags(tags: Array<string>) {
    this.loadTagItems(tags);
  }

  @Input()
  set sorts(sorts: Array<string>) {
    this.loadSortItems(sorts);
  }

  searchForm: FormControl = new FormControl();
  tagItems: Item[] = [];
  sortItems: Item[] = [];

  @Output() searchSubmitEvent = new EventEmitter<Object>();

  constructor(private tagService: TagService, private translateService: TranslateService) { }

  ngOnInit(): void { }

  loadTagItems(tags: Array<string>) {
    this.tagService.getAllTags().subscribe({
      next: (response) => {
        this.tagItems = response.map(
          tag => {
            let item: Item;

            if (tags.length && tags.includes(tag.name)) {
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

  loadSortItems(sorts: Array<string>) {
    this.sortItems = Array.from(this.sortValues).map(
      ([key, value]) => {
        let item: Item;

        if ((!sorts.length && this.sortValues.get(1) == value) ||
            (sorts.length && sorts.includes(value))) {
          item = {
            id: key,
            name: value,
            checked: true
          } as Item;
        } else {
          item = {
            id: key,
            name: value
          } as Item;
        }

        return item;
      }
    );

    this.loadSortItemsTranslate();
  }

  loadSortItemsTranslate() {
    for (let sortItem of this.sortItems) {
      this.translateService.stream("pages.gift-certificate.catalog.search-box.sorts." + sortItem.name).subscribe(
        translate => {
          sortItem.name = translate;
        }
      );
    }
  }

  submitForm() {
    let searchParams: any = {
      search: this.searchForm.value,
      tags: this.getCheckedTags(),
      sorts: this.getCheckedSorts()
    };

    this.searchSubmitEvent.emit(searchParams);
  }

  getCheckedTags(): Array<string> {
    return this.tagItems.filter(item => item.checked).map(
      item => (item.name)
    );
  }

  getCheckedSorts(): Array<string> {
    return this.sortItems.filter(item => item.checked).map(
      item => (this.sortValues.get(item.id!)!)
    );
  }
}
