import { When } from "@badeball/cypress-cucumber-preprocessor";

When("visito la página principal", () => {
    cy.visit("/");
});
