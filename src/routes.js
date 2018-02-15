// @flow
const path = require("path");
const express = require("express");
const graphql = require("express-graphql");
const { schema, content } = require("@react-finland/content-2018");
const calendar = require("./calendar");

function createRouter() {
  const router = new express.Router();

  router.all(
    "/graphql-2018",
    graphql({
      graphiql: process.env.NODE_ENV === "development",
      pretty: true,
      schema: schema.executable(),
    })
  );

  router.all(
    "/calendar-2018.ics",
    calendar({
      title: "React Finland 2018",
      location: "Valkoinen Sali, Aleksanterinkatu, Helsinki, Finland",
      schedules: content.schedules,
    })
  );

  router.use(
    "/graphql-2018/images",
    express.static(
      path.resolve(
        __dirname,
        "..",
        "node_modules",
        "@react-finland/content-2018/images"
      )
    )
  );

  return router;
}

module.exports = createRouter;
