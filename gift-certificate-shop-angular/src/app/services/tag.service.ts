import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private readonly TAG_URL = "api/tags";
  private readonly TAG_ALL_URL = "api/tags/all";
  private readonly TAG_COUNT_URL = "api/tags/count";
  private readonly TAG_NAME_URL = "api/tags/name";

  constructor(private http: HttpClient, private paginationService: PaginationService) { }

  getTags(search: string, page: number, size: number): Observable<Tag[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append("search", search);
    }

    params = params.append("page", page);
    params = params.append("size", size);

    return this.http.get<Tag[]>(this.TAG_URL, {params: params});
  }

  getTagById(id: number): Observable<Tag> {
    let url = this.TAG_URL + "/" + id;
    return this.http.get<Tag>(url);
  }

  existTagByName(name: string): Observable<number> {
    let url = this.TAG_NAME_URL + "/" + name;
    return this.http.get<number>(url);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.TAG_ALL_URL);
  }

  getCount(search: string): Observable<number> {
    let params = new HttpParams();

    if (search) {
      params = params.append("search", search);
    }

    return this.http.get<number>(this.TAG_COUNT_URL, {params: params});
  }

  createTag(tag: Tag): Observable<any> {
    return this.http.post(this.TAG_URL, tag);
  }

  updateTag(tag: Tag): Observable<any> {
    let url = this.TAG_URL + "/" + tag.id;
    return this.http.patch(url, tag);
  }

  deleteTag(id: number): Observable<any> {
    let url = this.TAG_URL + "/" + id;
    return this.http.delete(url);
  }
}
