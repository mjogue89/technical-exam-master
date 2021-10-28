import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { JobsAddComponent } from "./jobs/pages/jobs-add/jobs-add.component";
import { JobsService } from "./jobs.service";

const routes: Routes = [
  {
    path: "jobs",
    loadChildren: () => import("./jobs/jobs.module").then((m) => m.JobsModule),
  },
  {
    path: "new-job",
    component: JobsAddComponent,
  },
  {
    path: "",
    redirectTo: "/jobs",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [JobsService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
