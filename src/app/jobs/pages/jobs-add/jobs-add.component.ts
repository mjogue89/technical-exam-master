import { Component, Input, OnInit } from "@angular/core";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

import { Job } from "../../../shared/models/jobs";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as actions from "../../state/jobs-add.actions";
import * as fromJob from "../../state/jobs-add.reducer";
import { JobsService } from "../../../jobs.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-jobs-add",
  templateUrl: "./jobs-add.component.html",
  styleUrls: ["./jobs-add.component.scss"]
})
export class JobsAddComponent implements OnInit {
  // @ts-ignore
  jobs: Observable<any>;
  add = faPlus;
  jobPosition: any;
  companyName: any;
  status: any;
  company: any = [];
  addForm: FormGroup;
  descAddForm: FormGroup;
  backArrow = faArrowLeft;

  constructor(
    private store: Store<fromJob.JobState>,
    private router: Router,
    private js: JobsService,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      company: ["", Validators.required],
      type: ["", Validators.required],
      title: ["", Validators.required],
      link: [
        "https://cnn.com/integer/non/velit/donec/diam/neque/vestibulum.xml?nisl=molestie&duis=hendrerit&bibendum=at&felis=vulputate&sed=vitae&interdum=nisl&venenatis=aenean&turpis=lectus&enim=pellentesque&blandit=eget&mi=nunc&in=donec&porttitor=quis&pede=orci&justo=eget&eu=orci&massa=vehicula&donec=condimentum&dapibus=curabitur&duis=in&at=libero&velit=ut&eu=massa&est=volutpat&congue=convallis&elementum=morbi&in=odio&hac=odio&habitasse=elementum&platea=eu&dictumst=interdum&morbi=eu&vestibulum=tincidunt&velit=in&id=leo&pretium=maecenas&iaculis=pulvinar&diam=lobortis&erat=est&fermentum=phasellus&justo=sit&nec=amet&condimentum=erat&neque=nulla&sapien=tempus&placerat=vivamus&ante=in&nulla=felis&justo=eu&aliquam=sapien&quis=cursus&turpis=vestibulum&eget=proin&elit=eu&sodales=mi&scelerisque=nulla&mauris=ac&sit=enim&amet=in&eros=tempor&suspendisse=turpis&accumsan=nec&tortor=euismod&quis=scelerisque&turpis=quam&sed=turpis&ante=adipiscing&vivamus=lorem&tortor=vitae&duis=mattis&mattis=nibh&egestas=ligula&metus=nec&aenean=sem&fermentum=duis&donec=aliquam&ut=convallis"
      ],
      id: [new Date().getTime()],
      date: [new Date().toLocaleDateString("en-US")],
      delete: [false],
      logo: ["http://dummyimage.com/184x100.png/cc0000/ffffff"]
    });
    this.descAddForm = this.fb.group({
      description: [""],
      responsibility: [""],
      requirements: [""],
      id: [""],
    });
  }

  ngOnInit(): void {
    this.getCompanyNames();
  }

  getCompanyNames() {
    this.js.getCompanies().subscribe((value: any) => {
      this.company = value || [];
    });
  }

  addPost() {
    this.descAddForm
      .get("id")
      ?.setValue(this.addForm.get("id")?.value.toString());
    this.addForm
      .get("id")
      ?.setValue(this.addForm.get("id")?.value.toString());
    if (this.addForm.valid && this.descAddForm.valid) {
      this.js
        .addJobPosting(
          this.addForm.get("id")?.value.toString(),
          this.addForm?.getRawValue(),
          this.descAddForm.getRawValue()
        )
        .then((resolve: any) => {
          this.addForm.reset();
          this.descAddForm.reset();
          this.js.snackBar("Job Posted!", "X");
          this.back();
        })
        .catch((error) => {
          this.js.snackBar("Job Posted Failed!", "X");
        });
    } else {
      this.js.snackBar("Please answer required fields", "X");
    }
  }

  back() {
    this.router.navigate(["jobs"]);
  }
}
