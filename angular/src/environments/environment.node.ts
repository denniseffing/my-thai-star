export enum BackendType {
  IN_MEMORY,
  REST,
  GRAPHQL,
}

export const environment: {production: boolean, backendType: BackendType, authCallback: string, restPathRoot: string, restServiceRoot: string} = {
  production: false,
  backendType: BackendType.REST,
  authCallback: `${location.origin}/callback/`,
  restPathRoot: 'http://localhost:9080/mythaistar/',
  restServiceRoot: 'http://localhost:9080/mythaistar/services/rest/',
};
