import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Job } from "../../../shared/models/jobs";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";
import { Router } from "@angular/router";
import { JobsService } from "../../../jobs.service";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"]
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  add = faPlus;
  posts: any = [];
  searchField: string = "";
  cat: string = "";
  order: string = "";
  type: string = "";

  constructor(
    private store: Store,
    private router: Router,
    private js: JobsService
  ) {
  }

  ngOnInit(): void {
    this.getAllJobPost();
    // this.store.dispatch(jobsActions.getJobs());
    // this.jobs$ = this.store.pipe(select(fromJobs.selectJobs));
  }

  search() {
    if (this.cat.length > 0 || this.order.length > 0) {
      this.js.filter(this.cat, this.order).subscribe((result: any) => {
        this.posts = result;
      });
    } else if (this.type.length > 0) {
      this.js.filterType(parseFloat(this.type)).subscribe((result: any) => {
        this.posts = result;
      });
    } else if (this.searchField.length > 0) {
      this.js.search(this.searchField, this.cat).subscribe((result: any) => {
        this.posts = result;
      });
    } else {
      this.getAllJobPost();
    }
  }

  clearSearch() {
    this.searchField = "";
    this.cat = "";
    this.order = "";
    this.type = "";
    this.getAllJobPost();
  }

  onAdd(): void {
    // TODO: feel free to modify any files.
    // NOTE: Only maintain console.log that are useful in debugging
    this.router.navigate(["new-job"]);
  }

  getAllJobPost() {
    this.js.getJobPosting().subscribe((res: any) => {
      this.posts = [];
      res.forEach((value: any) => {
        this.posts.push(value.payload.doc.data());
      });
    });
  }
}
