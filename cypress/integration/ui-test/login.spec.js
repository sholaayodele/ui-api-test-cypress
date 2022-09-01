/// <reference types="cypress" />

import { LoginPage, HomePage } from "../../support/page-objects";

describe("Test Login Functionality", () => {
  beforeEach(() => {
    cy.fixture("credentials").then((data) => {
      //using a callback function to have access to the data in the fixture file and assigning it to a variable to make it global so it can be accessed through out the test.
      globalThis.data = data;
    });
    cy.visit("/login");
    cy.url().should("include", "/login");
    cy.title().should("eq", "The Internet");
    LoginPage.getUsernameField().should("be.visible").clear();
    LoginPage.getPasswordField().should("be.visible").clear();
  });

  // Happy Path
  it("should login successfully into application", () => {
    LoginPage.getUsernameField().type(data.username);
    LoginPage.getPasswordField().type(data.password);
    LoginPage.getLoginButton().click();
    cy.hash().should("be.empty");
    HomePage.getFlashLoginSuccess()
      // assert successful log in notification
      .should("have.class", "success")
      .contains("You logged into a secure area!")
      .and("be.visible");
    HomePage.getCloseFlashSuccess()
      .should("have.attr", "href")
      .and("equal", "#");
    HomePage.getPageHeader().should("include.text", "Secure Area");
    HomePage.getLogOutBtn()
      .should("exist")
      .and("have.attr", "href")
      .and("equal", "/logout");
  });

  // Negative Test cases
  it("should not login into application with wrong username and wrong password credentials ", () => {
    LoginPage.getUsernameField().type(data.dummyUsername);
    LoginPage.getPasswordField().type(data.dummyPassword);
    LoginPage.getLoginButton().click();
    LoginPage.getUserErrorNotification()
      .should("be.visible")
      .and("have.class", "error");
    LoginPage.getUsernameInvalidCloseBtn()
      //assert notification tab has a close button
      .should("have.attr", "href")
      .and("equal", "#");
  });

  it("should not login into application when username is wrong and right password is entered", () => {
    LoginPage.getPasswordField().type(data.password);
    LoginPage.getLoginButton().click();
    LoginPage.getUserErrorNotification()
      .should("be.visible")
      .and("have.class", "error");
  });

  it("should not login into application when password is wrong and right username is entered", () => {
    LoginPage.getUsernameField().type(data.username);
    LoginPage.getLoginButton().click();
    LoginPage.getPasswordErrorNotification()
      .should("be.visible")
      .and("have.class", "error")
      .and("include.text", "Your password is invalid!");
  });

  it("should not login into application when both username and password field are left empty", () => {
    LoginPage.getLoginButton().click();
    LoginPage.getUserErrorNotification()
      .should("be.visible")
      .and("have.class", "error");
  });
});
