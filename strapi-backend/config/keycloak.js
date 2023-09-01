module.exports = {
  // client ID configured in Keycloak
  clientId: "strapi",

  // if the client access type is set to "confidential" in keycloak, add the client secret here. otherwise, don't set this value.
  clientSecret: "uYBsUPl8ln8NzrNiWdLrKdFIW6MsFTB2",

  // auth endpoint, right value comes from Keycloak
  authEndpoint:
    "http://localhost:8181/realms/strapi/protocol/openid-connect/auth",

  // token endpoint, right value comes from Keycloak
  tokenEndpoint:
    "http://localhost:8181/realms/strapi/protocol/openid-connect/token",

  // user info endpoint, right value comes from Keycloak
  userinfoEndpoint:
    "http://localhost:8181/realms/strapi/protocol/openid-connect/userinfo",

  // logout endpoint, right value comes from Keycloak
  logoutEndpoint:
    "http://localhost:8181/realms/strapi/protocol/openid-connect/logout",

  // redirect URI after Keycloak login, should be the full URL of the Strapi instance and always point to the `keycloak/callback` endpoint
  redirectUri: "http://localhost:1337/keycloak/callback",

  // default URL to redirect to when login process is finished. In normal cases, this would redirect you back to the application using Strapi data
  redirectToUrlAfterLogin: "http://localhost:1337/api/webinars",

  // setting these allows the client to pass a `redirectTo` query parameter to the `login` endpoint. If the `redirectTo`
  // parameter is permitted by this array, after login, Strapi will redirect the user to it. Leave empty to disable
  // the functionality.
  permittedOverwriteRedirectUrls: [
    "http://localhost:1337",
    "http://localhost:1338",
  ],

  // URL to redirect to after logout
  redirectToUrlAfterLogout: "http://localhost:1337/",
  jwtPublicKey:"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1dq0Gr4z1XQhWgySf6cEj6gzvjN+5lS7y4Ju/r1DyfmuTIHwBe3fg4mafwE/nha9bZzl3eTCWxHtvy5bLjNqedNxTnNLimXjJIrCHkTsUKVfule2sqFQ4tZI5nmERg5HDjcRTxWDsTWAOWiKVYffqgtaw+dEsE6wk2KijHm57jbWc+wfVS8o8d/PubMTORGxrxawUcIRr3wm1kaKpIo/LNwM5J8NLaILPPDdDd08hE7PYGhz2+ISVgmMnJJflZvasjBrCgubfuEqYJF1zTaa9j+4oO0v+TFEIEoxDvcryFn+hUkdj5w7VnpZLJUHHZGXdh1V+iDSUE5UaiF0oXreUwIDAQAB",

  jwtAlgorithm: "RS256",

  // enable debug messages in server log
  debug: true,
};
