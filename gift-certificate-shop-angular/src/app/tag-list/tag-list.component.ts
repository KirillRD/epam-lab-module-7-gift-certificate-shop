import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tag } from '../models/tag';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  tags!: Array<Tag>;

  search!: string;
  page!: number;
  size: number = 10;

  count!: number;

  private readonly TAG_LIST_URL = "/tag-list";

  constructor(private tagService: TagService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        let search = params.get("search");
        let page = params.get("page");

        if (search) {
          this.search = search;
        }

        if (page) {
          this.page = Number(page);
          this.loadTags();
        } else {
          this.navigateToTagList(1);
        }
      }
    );
  }

  loadTags() {
    this.tagService.getTags(this.search, this.page, this.size).subscribe({
      next: (response) => {
        this.tags = response;
      },
      complete: () => {
        this.loadCount();
      }
    });
  }

  navigateToTagList(page: number) {
    let params: any = {};

    if (this.search) {
      params.search = this.search;
    }

    params.page = page;

    this.router.navigate([this.TAG_LIST_URL], {
      queryParams: params
    });
  }

  loadCount() {
    this.tagService.getCount(this.search).subscribe(
      (response) => {
        this.count = response;
      }
    );
  }

  searchSubmit(searchParams: any) {
    this.search = searchParams.search;
    this.navigateToTagList(1);
  }
}
