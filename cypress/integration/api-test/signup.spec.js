/// <reference types="cypress" />

const dataJson = require("../../fixtures/credentials.json");

describe("Signup", () => {
  it("Test Valid Signup", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("url") + "/register",
      body: {
        email: dataJson.apiEmail,
        password: dataJson.apiPassword,
      },
    })
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.keys("id", "token");
        expect(res.body).has.property("id", 2);
        expect(res.body).has.property("token", "QpwL5tke4Pnpja7X2");
        assert.isNumber(res.body.id); // asserts property ID is  a number
        assert.isString(res.body.token); //asserts property token is a string
        expect(res.headers).has.property(
          "content-type",
          "application/json; charset=utf-8"
        );
        expect(res.headers).has.property("date");
        expect(res.headers).has.property("content-length", "36");
        assert.isString(res.headers.date);
      })
      .then((res) => {
        const userId = res.body.id;

        // Performing a GET request on user that was just created and asserting it returns the correct tokens
        cy.request({
          method: "GET",
          url: Cypress.env("url") + "/users/" + userId,
          headers: {
            accept: "application/json; charset=utf-8", //response would be in format of JSON
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.keys("data", "support");
          expect(res.body.data.id).to.eq(userId);
          expect(res.body.data.email).to.eq("janet.weaver@reqres.in");
          expect(res.body.data.first_name).to.eq("Janet");
          expect(res.body.data.last_name).to.eq("Weaver");
          expect(res.body.data.avatar).to.eq(
            "https://reqres.in/img/faces/2-image.jpg"
          );
          expect(res.body.support.url).to.eq(
            "https://reqres.in/#support-heading"
          );
          expect(res.body.support).has.property(
            "text",
            "To keep ReqRes free, contributions towards server costs are appreciated!"
          );
        });
      });
  });
});
