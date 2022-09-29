import { Component, Input, OnInit } from '@angular/core';
import { AuthRepository } from 'src/app/state/auth.repository';
import { AuthService } from '../../shared/services/auth.service';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: LoginData = { username: '', password: '' };
  errorMessage$ = this.authRepo.getErrorMessage();

  constructor(
    private authRepo: AuthRepository,
    private authService: AuthService
  ) {}

  onSubmit(loginForm: LoginData) {
    this.authService.login(loginForm.username, loginForm.password);
  }

  ngOnInit(): void {
    // this.authRepo.getCurrentUser().subscribe((user) => {
    //   if (user) {
    //     this.authRepo.redirectToDashboard();
    //   }
    // });
  }
}
