import { Action, createAction, props } from "@ngrx/store";
import { Job } from "../../shared/models/jobs";

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
  constructor(public job: Job) {}
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
