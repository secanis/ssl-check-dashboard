import { createStore, withProps, select, setProps } from '@ngneat/elf';
import {
  selectEntities,
  withEntities,
  setEntities,
} from '@ngneat/elf-entities';
import { SslCheck, SslError, State } from '../../../../server/src/types';
import { startDevtools } from './devtools';
import { map, Observable, startWith } from 'rxjs';
import { Injectable } from '@angular/core';

startDevtools();

const dataStore = createStore({ name: 'data' }, withEntities<SslCheck>());
const errorStore = createStore({ name: 'error' }, withEntities<SslError>());
const stateStore = createStore(
  { name: 'state' },
  withProps<State>({ queue: -1, processing: -1, connected: false })
);

@Injectable({ providedIn: 'root' })
export class DataRepository {
  private data$ = dataStore.pipe(selectEntities());
  private errors$ = errorStore.pipe(selectEntities());
  private state$ = stateStore.pipe(select((state) => state));

  // setUser(user: User) {
  //   authStore.update({ user });
  // }

  getSslData(): Observable<SslCheck[]> {
    return this.data$.pipe(
      map((data) => {
        return Object.values(data).reduce((acc, curr) => {
          acc.push(curr);
          return acc;
        }, [] as SslCheck[]);
      }),
      startWith([])
    );
  }

  getErrors(): Observable<Record<string, SslError>> {
    return this.errors$;
  }

  getCurrentState(): Observable<State> {
    return this.state$;
  }

  setSslData(data: SslCheck[]) {
    dataStore.update(setEntities(data));
  }

  setErrorData(errs: SslError[]) {
    errorStore.update(setEntities(errs));
  }

  setState(state: State) {
    stateStore.update(setProps(state));
  }
}
