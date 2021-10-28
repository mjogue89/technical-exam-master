import { Action, createAction, props } from "@ngrx/store";
import { Job } from "../../shared/models/jobs";

// Fetch all jobs
export const getJobs = createAction("[Jobs API] Get Jobs");
export const getJobsSuccess = createAction(
  "[Jobs API] Get Jobs Success",
  props<{ jobs: Job[] }>()
);
export const getJobsError = createAction(
  "[Jobs API] Get Jobs Error",
  props<{ error: string }>()
);

// Adding Job Actions
export const addJobLoad = createAction("[Jobs API] Add Job Load");
export const addJobSuccess = createAction(
  "[Jobs API] Add Job Success",
  props<{ job: Job }>()
);
export const addJobError = createAction(
  "[Jobs API] Add Job Error",
  props<{
    error: string;
  }>()
);

// TODO: add additional actions for other CRUD operations
export const QUERY = "[Job] query jobs";
export const ADDED = "[Job] added";
export const MODIFIED = "[Job] modified";
export const REMOVED = "[Job] removed";

export const UPDATE = "[Job] update";
export const SUCCESS = "[Job] update success";

export class Query implements Action {
  readonly type = QUERY;
  constructor() {}
}

// CRUD
export class Added implements Action {
  readonly type = ADDED;
  constructor(public payload: Job) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor(public payload: Job) {}
}

export class Removed implements Action {
  readonly type = REMOVED;
  constructor(public payload: Job) {}
}

// Firestore Update

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: String, public change: Partial<Job>) {}
}

export class Success implements Action {
  readonly type = SUCCESS;
  constructor() {}
}

export type JobActions = Query | Added | Modified | Removed | Update | Success;
