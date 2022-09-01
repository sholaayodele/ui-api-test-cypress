class LoginPage {
  getUsernameField() {
    return cy.get("input#username");
  }

  getPasswordField() {
    return cy.get("input#password");
  }

  getLoginButton() {
    return cy.get("button").contains("Login");
  }

  getUserErrorNotification() {
    return cy.get("div#flash").contains("Your username is invalid!");
  }
  getPasswordErrorNotification() {
    return cy.get("div#flash").contains("Your password is invalid!");
  }

  getUsernameInvalidCloseBtn() {
    return cy.get("a.close");
  }

  getPasswordInvalidCloseBtn() {
    return cy.get("a.close");
  }
}

export default new LoginPage();
