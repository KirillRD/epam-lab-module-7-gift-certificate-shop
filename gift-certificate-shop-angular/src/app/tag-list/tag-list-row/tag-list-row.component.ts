import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-list-row',
  templateUrl: './tag-list-row.component.html',
  styleUrls: ['./tag-list-row.component.scss'],
  host: {'class': 'col d-flex justify-content-center'}
})
export class TagListRowComponent implements OnInit {

  @Input() tag!: Tag;

  constructor(private tagService: TagService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteTag() {
    this.tagService.deleteTag(this.tag.id).subscribe({
      complete: () => {
        this.router.navigateByUrl('/tag-list').then(
          () => window.location.reload()
        );
      }
    });
  }
}
