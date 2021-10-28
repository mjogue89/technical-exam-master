import { Injectable, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";

import { Jobs } from "../state/jobs-add.reducer";
import * as jobsActions from "../state/jobs-add.actions";
import { MainService } from "../../core/services/main.service";
import { catchError, map, mergeMap } from "rxjs/operators";

const data = { company_name: "Bergstrom and Sons" };

@Injectable()
export class JobsEffects {
  query$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Job] Load Movies"),
      mergeMap(() =>
        this.main.getCompanies().pipe(
          map((company) => ({ type: "[Job] Success", company: company })),
          catchError(() => of({ type: "[Job] Error" }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private main: MainService) {}
}
