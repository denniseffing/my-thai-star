import { environment } from 'environments/environment';

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'MrowCTSP4D02F7M93UoYqRTXRYydCQl6',
  domain: 'mythaistar.eu.auth0.com',
  callbackURL: environment.authCallback,
};
