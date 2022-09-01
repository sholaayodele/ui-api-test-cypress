/// <reference types="cypress" />

const dataJson = require("../../fixtures/credentials.json");

describe("Login", () => {
  it("Test Valid Login", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("url") + "/login",
      body: {
        email: dataJson.apiEmail,
        password: dataJson.apiPassword,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      expect(res.body).has.property("token", "QpwL5tke4Pnpja7X2");
      expect(res.headers).has.property(
        "content-type",
        "application/json; charset=utf-8"
      );
      assert.isString(res.body.token);
      assert.isString(res.headers.date);
    });
  });

  it("Test Invalid login - Password field is empty", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("url") + "/login",
      failOnStatusCode: false, // Making a reverse on fail
      body: {
        email: dataJson.apiEmail,
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.statusText).to.eq("Bad Request");
      expect(res.body).has.property("error", "Missing password");
      expect(res.headers).has.property(
        "content-type",
        "application/json; charset=utf-8"
      );
    });
  });
});
