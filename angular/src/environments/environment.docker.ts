import { BackendType } from 'app/config';

export const environment: {production: boolean, backendType: BackendType, authCallback: string, restPathRoot: string, restServiceRoot: string} = {
  production: true,
  backendType: BackendType.REST,
  authCallback: 'callback/',
  restPathRoot: 'api/',
  restServiceRoot: 'api/services/rest/',
};
