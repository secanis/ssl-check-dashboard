import { Injectable } from '@angular/core';
import { createStore, withProps, select, setProps } from '@ngneat/elf';
import { Observable } from 'rxjs';
import { User, UserStore } from '../../../../server/src/types';

interface AuthProps {
  user: User | null;
  session: UserStore;
}

const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ user: null, session: { token: '', error: '' } })
);

@Injectable({ providedIn: 'root' })
export class AuthRepository {
  private user$ = authStore.pipe(select((state) => state.user));
  private session$ = authStore.pipe(select((state) => state.session));

  constructor() {
    authStore.update(
      setProps({ session: { token: sessionStorage['token'] || '', error: '' } })
    );
  }

  logout(): void {
    authStore.update(
      setProps({ user: null, session: { token: '', error: '' } })
    );
  }

  setSession(token: string, error: string) {
    authStore.update(setProps({ session: { token, error } }));
    if (token) sessionStorage['token'] = token;
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }

  getSession(): Observable<UserStore> {
    return this.session$;
  }

  getErrorMessage(): Observable<string> {
    return this.session$.pipe(select((session) => session.error));
  }
}
