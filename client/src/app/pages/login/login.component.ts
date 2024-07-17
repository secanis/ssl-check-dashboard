import { Component } from '@angular/core';
import { AuthRepository } from 'src/app/state/auth.repository';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: LoginData = { username: '', password: '' };
  errorMessage$ = new Observable<string>();

  constructor(
    private authRepo: AuthRepository,
    private authService: AuthService
  ) {
    this.errorMessage$ = this.authRepo.getErrorMessage();
  }

  onSubmit(loginForm: LoginData) {
    this.authService.login(loginForm.username, loginForm.password);
  }
}
