import * as actions from "./jobs-add.actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { REMOVED } from "./jobs-add.actions";
import { createFeatureSelector, State } from "@ngrx/store";

export interface Jobs {
  company_name: string;
  id: string;
}

export const JobsAdapter = createEntityAdapter<Jobs>();

export interface JobState extends EntityState<Jobs> {
}

const defaultJobs = {
  id: "96c76de4-2558-42f9-84e9-f696c5dd1bdd",
  company: "Bergstrom and Sons",
  logo: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
  link: "https://mozilla.org/eget/eros.jpg?nibh=quis&in=odio&lectus=consequat&pellentesque=varius&at=integer&nulla=ac&suspendisse=leo&potenti=pellentesque&cras=ultrices&in=mattis&purus=odio&eu=donec&magna=vitae&vulputate=nisi&luctus=nam&cum=ultrices",
  date: "8/26/2021",
  title: "Design Engineer",
  type: 0,
};

export const initialState: JobState = JobsAdapter.getInitialState(defaultJobs);

export function jobReducer(
  state: JobState = initialState,
  action: actions.JobActions
) {
  switch (action.type) {
    case actions.ADDED:
      // @ts-ignore
      return JobsAdapter.addOne(action.job, state);
    case actions.MODIFIED:
      return JobsAdapter.updateOne(
        {
          // @ts-ignore
          id: action.id,
          // @ts-ignore
          changes: action.changes,
        },
        state
      );
    case actions.REMOVED:
      // @ts-ignore
      return JobsAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

// @ts-ignore
export const getJobsState = createFeatureSelector<State>("job");
export const { selectIds, selectEntities, selectAll, selectTotal } =
  JobsAdapter.getSelectors();
