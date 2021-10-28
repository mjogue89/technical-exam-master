import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsComponent } from "./pages/jobs/jobs.component";
import { JobComponent } from "./pages/jobs/job/job.component";
import { JobDescriptionComponent } from "./pages/job-description/job-description.component";
import { JobsAddComponent } from "./pages/jobs-add/jobs-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "./pages/dialog/alert/alert.component";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    JobsComponent,
    JobComponent,
    JobDescriptionComponent,
    JobsAddComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    JobsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],

  entryComponents: [AlertComponent],
})
export class JobsModule {}
