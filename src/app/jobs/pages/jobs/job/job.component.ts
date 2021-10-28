import { Component, Input, OnInit } from "@angular/core";
import { Job, JobType } from "../../../../shared/models/jobs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material/dialog";
import { AlertComponent } from "../../dialog/alert/alert.component";
import { JobsService } from "../../../../jobs.service";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"]
})
export class JobComponent implements OnInit {
  @Input() job: Job | null = null;
  toShow: string = "hide";
  trash = faTrash;
  JobType = JobType;

  selectedJobPost: any = [];

  constructor(private dialog: MatDialog, private js: JobsService) {
  }

  ngOnInit(): void {
  }

  changeStyle($event: any) {
    this.toShow = $event.type == "mouseover" ? "show" : "hide";
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: "auto",
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.removeJob();
      }
    });
    if (data) {
      this.js.getJobPost(data.id).subscribe((res: any) => {
        this.selectedJobPost = {
          data: res[0].payload.doc.data(),
          id: res[0].payload.doc.id,
        };
      });
    }
  }

  removeJob() {
    this.js
      .removeJobPost(this.selectedJobPost.id)
      .then((resolve) => {
        this.js.snackBar("Job Removed", "X");
      })
      .catch((error) => {
        this.js.snackBar("Job Removed Failed", "X");
      });
  }
}
