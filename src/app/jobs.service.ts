import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Job } from "./shared/models/jobs";
import jobs from "./jobs/jobs.json";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class JobsService {
  collection_companies: any = "jl_companies";
  collection_posting: any = "jl_posting";
  collection_details: any = "jl_details";

  constructor(private fire: AngularFirestore, private snack: MatSnackBar) {
  }

  getJobs(): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    return of(jobs);
  }

  getCompanies() {
    return this.fire.collection(this.collection_companies).valueChanges();
  }

  getJobPosting() {
    return this.fire
      .collection(this.collection_posting, (ref) =>
        ref.where("delete", "==", false).orderBy("date", "asc")
      )
      .snapshotChanges();
  }

  getJobPost(id: any) {
    return this.fire
      .collection(this.collection_posting, (ref) => ref.where("id", "==", id))
      .snapshotChanges();
  }

  removeJobPost(id: any) {
    return this.fire
      .collection(this.collection_posting)
      .doc(id)
      .update({ delete: true });
  }

  getJobDescription(id: any) {
    return this.fire
      .collection(this.collection_details, (ref) => ref.where("id", "==", id))
      .valueChanges();
  }

  getJobDescriptionId(id: any) {
    return this.fire
      .collection(this.collection_details, (ref) => ref.where("id", "==", id))
      .snapshotChanges();
  }


  updateJobDescription(id: any, data: any) {
    return this.fire.collection(this.collection_details).doc(id).update(data);
  }

  snackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  addJobPosting(id: any, posting: any, description: any) {
    let batch = this.fire.firestore.batch();
    const posting_reference = this.fire
      .collection(this.collection_posting)
      .doc().ref;
    batch.set(posting_reference, posting);

    const detailed_reference = this.fire
      .collection(this.collection_details)
      .doc().ref;
    batch.set(detailed_reference, description);

    return batch.commit();
  }

  search(data: any, field: any) {
    return this.fire
      .collection(this.collection_posting, (ref) =>
        ref
          .where(field, ">=", data)
          .where("delete", "==", false)
      )
      .valueChanges();
  }

  filter(field: any, order: any) {
    order = order || "asc";
    field = order || "title";
    return this.fire
      .collection(this.collection_posting, (ref) =>
        ref.where("delete", "==", false).orderBy(field, order)
      )
      .valueChanges();
  }

  filterType(value: any) {
    return this.fire
      .collection(this.collection_posting, (ref) =>
        ref.where("type", "==", value).where("delete", "==", false)
      )
      .valueChanges();
  }
}
