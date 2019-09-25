declare var SSOAuth: any;

export const SSO = new SSOAuth({
  tenantId: '08a94e5c-76ac-4025-99eb-e76f9dc47f6b',
  loginCallback: 'http://localhost:4200/home',
  logoutCallback: 'http://localhost:4200/logout'
});
