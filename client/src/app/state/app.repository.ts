import { Injectable } from '@angular/core';
import { createStore, withProps, select, setProps } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';

interface AppProps {
  minimized: boolean;
  showGrid: boolean;
}

const appStore = createStore(
  { name: 'auth' },
  withProps<AppProps>({ minimized: true, showGrid: true })
);

persistState(appStore, {
  key: 'ssl-app',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class AppRepository {
  private minimized$ = appStore.pipe(select((state) => state.minimized));
  private showGrid$ = appStore.pipe(select((state) => state.showGrid));

  setMinimized(minimized: boolean): void {
    appStore.update(setProps({ minimized }));
  }

  getMinimized(): Observable<boolean> {
    return this.minimized$;
  }

  setShowGrid(showGrid: boolean): void {
    appStore.update(setProps({ showGrid }));
  }

  getShowGrid(): Observable<boolean> {
    return this.showGrid$;
  }
}
