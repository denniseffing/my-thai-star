// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { BackendType } from 'app/config';

export const environment: {production: boolean, backendType: BackendType, authCallback: string, restPathRoot: string, restServiceRoot: string} = {
  production: false,
  backendType: BackendType.REST,
  authCallback: 'http://localhost:4200/callback',
  restPathRoot: 'http://localhost:8081/mythaistar/',
  restServiceRoot: 'http://localhost:8081/mythaistar/services/rest/',
};
