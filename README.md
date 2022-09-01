# UI and API Testing using Cypress

This repo contains UI e2e testcases for login and API testcases for signup and loging. The Application Under Test is [The Internet](http://the-internet.herokuapp.com/login) for UI and for API is [Reqres](https://reqres.in) .

## Technology Stack

- Language: Javascript
- Framework: Cypress

## Reasons for choosing cypress framework

- Cypress automatically waits for commands and assertions before moving on. No more async hell. If the link is disabled, the test would fail because it's not in clickable mode, but cypress automatically checkout for the state of this, checks in the html what’s going on(the state). In selenium you need to explicitly mention wait.

- Ability to test Edge test cases by mocking the server response. It has the ability to automate network request. API validations can be made on cypress. Ability to stop a real response and inject a mock(fake) response i.e sending fake response of github server being down.

- Time travel feature in cypress. Cypress takes snapshots as the test is being run. We can hover each commands in the command log to see exactly what happened at each step. It aids in debugging, one can view before and after action.

- Because of its Architectural design, cypress delivers fast, consistent and reliable test execution compared to other automation tools.

- View videos of your entire tests execution when run from the cypress dashboards. Tests can be configured to be integrated with the dashboard.

### Pattern

**Page Object Pattern**: A design pattern where Page Objects are separated from automation test scripts. Page Object has different advantages, some of which are;

- Readability
- Easy to debug
- Easy to work with
- They easily get you to a state that you want or need
- They are easy to maintain

## STEPS TO SETUP AND RUN THE PROJECT

1. Have node.js installed. Easily install by running ` node.js`
2. Run `git clone https://github.com/sholaayodele/ui-api-test-cypress.git`
3. Go into the cloned folder with `cd ui-api-test-cypress`
4. Run `npm install `
5. Run `npm install cypress --save-dev`
6. Run `npm run test` to run all test. Cypress supports multi browser testing, run `npm run cy:run:multiBrowser` to test multi browser.

## STEPS FOR IMPROVEMENTS

- In our UI test case we can validate the UI with XHR objects.
- Cypress CLI with environment variables.
- Generating Mocha Awesome reports for cypress execution
