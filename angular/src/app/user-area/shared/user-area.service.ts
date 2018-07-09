import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { AUTH_CONFIG } from './auth0-variables';
import { AuthService } from '../../core/authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TranslateService } from '@ngx-translate/core';
import * as auth0 from 'auth0-js';


@Injectable()
export class UserAreaService {
  private readonly loginRestPath: string = 'login';
  private readonly currentUserRestPath: string = 'security/v1/currentuser/';
  private readonly registerRestPath: string = 'register';
  private readonly changePasswordRestPath: string = 'changepassword';
  authAlerts: any;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile'
  });

  constructor(
    public snackBar: SnackBarService,
    public router: Router,
    public translate: TranslateService,
    private http: HttpClient,
    public authService: AuthService
  ) {
    this.translate.get('alerts.authAlerts').subscribe((result: any) => {
      this.authAlerts = result;
    });
  }

  login(): void {
    this.auth0.authorize();
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.authService.setToken(authResult.idToken);

        this.auth0.client.userInfo(authResult.accessToken, (err, data) => {
          if (data) {
            const user: any = {
              nickname: data['nickname'],
              role:  data['http://app.example.com/groups'][0]
            }

            this.setSession(authResult, user);
            this.authService.loadExistingSession();

            this.snackBar.openSnack(
              this.authAlerts.loginSuccess,
              4000,
              'green'
            )
          }
        })

        this.router.navigate(['/restaurant']);
      }
    })
  }

  setSession(authResult: any, user: any): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('username', user.nickname)
    localStorage.setItem('userrole', user.role);
  }

  register(email: string, password: string): void {
    console.log('Not implemented yet.');
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');

    this.authService.setUser('');
    this.authService.setRole('CUSTOMER');
    this.authService.setToken('');

    this.router.navigate(['restarant']);
    this.snackBar.openSnack(this.authAlerts.logoutSuccess, 4000, 'black');
  }

  changePassword(data: any): void {
    console.log('Not implemented yet');
  }
}
