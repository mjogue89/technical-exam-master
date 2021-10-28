import { Component, OnInit } from "@angular/core";
import { JobsService } from "../../../jobs.service";
import { Router } from "@angular/router";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-job-description",
  templateUrl: "./job-description.component.html",
  styleUrls: ["./job-description.component.scss"]
})
export class JobDescriptionComponent implements OnInit {
  desc: any = [];
  selectedJob: any = [];
  id: string = "";
  nextId: any = [];
  edit = faEdit;
  backArrow = faArrowLeft;
  allowEdit: boolean = false;

  descriptionForm: FormGroup;

  constructor(
    private js: JobsService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.descriptionForm = this.fb.group({
      description: [""],
      responsibility: [""],
      requirements: [""]
    });
  }

  ngOnInit(): void {
    const url = this.route.url;
    if (url) {
      const splitted = url.split("/");
      this.id = splitted[2] || "";
      this.js.getJobDescription(splitted[2]).subscribe((result: any) => {
        this.desc = result[0] || [];
      });
      this.getJob();
      this.js.getJobDescriptionId(this.id).subscribe((res: any) => {
        if (res) {
          this.nextId = res[0].payload.doc.id;
        }
      });
    }
  }

  getJob() {
    this.js.getJobPost(this.id).subscribe((result: any) => {
      result.forEach((value: any) => {
        this.selectedJob.push(value.payload.doc.data());
      });
    });
  }

  updateJobDescription() {
    if (this.descriptionForm.valid) {
      this.js
        .updateJobDescription(
          this.nextId,
          this.descriptionForm.getRawValue()
        )
        .then((result: any) => {
          this.js.snackBar("Job Description Successfully Updated!", "X");
          this.allowEdit = false;
          return;
        });
    }
  }

  goBack() {
    this.route.navigate(["jobs"]);
  }
}
