'use strict';

/**
 * webinar router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter("api::webinar.webinar", {
  config: {
    find: {
      middlewares: ["plugin::keycloak.keycloak"],
    },
  },
});


// module.exports = createCoreRouter("api::webinar.webinar");