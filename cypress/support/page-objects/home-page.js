class HomePage {
  getPageHeader() {
    return cy.get("h2");
  }

  getFlashLoginSuccess() {
    return cy.get("div#flash");
  }

  getCloseFlashSuccess() {
    return cy.get("a.close");
  }

  getLogOutBtn() {
    return cy.get("a.radius");
  }
}

export default new HomePage();
