# Pruebas E2E

Plantilla donde ya se encuentra Integrado Cypress & Cucumber.
Este repositorio actua externamente, solo se necesita proporcionar la ruta del sistema o sitio web
en el enviroment para utilizarlo.

El principal beneficio de usarlo como un proyecto externo es que se puede
acoplar con cualquier otra framework y que además no agrega más carga al proyecto real, es
decir a la aplicación propia dicha ya que no le instala ningún paquete o dependencia porque
actua como proyecto independiente.

## Instalar dependencias

```bash
npm install
```

## Copiar environment

```bash
cp .env.example .env
```

## Ejecutar pruebas

```bash
npm run cypress:open
```

## Estrucutra de carpetas

```bash
├── cypress
│   ├── features
│   │   └── login
│   │       ├── login.ts
│   │   └── login.feature
│   └── videos
│       └── example.spec.js.mp4
├── cypress.json
├── package-lock.json
├── package.json
└── README.md
```

## Ejemplo de feature

```bash
# language: es

Característica: Iniciar sesión

  Escenario: Iniciar sesión con éxito
    Dado que abro la página de login
    Cuando tipeo "admin" en el campo de usuario
    Y tipeo "admin" en el campo de contraseña
    Y doy click en el botón de login
    Entonces debería ver la página de dashboard
```

Palabras claves: [https://cucumber.io/docs/gherkin/languages/](https://cucumber.io/docs/gherkin/languages/)

## Ejemplo de step

```bash
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I open the login page", () => {
  cy.visit("https://www.google.com/");
});

When("I type {string} in the username field", (username) => {
  cy.get("#username").type(username);
});

When("I type {string} in the password field", (password) => {
  cy.get("#password").type(password);
});

When("I click on the login button", () => {
  cy.get("#login-button").click();
});

Then("I should see the dashboard page", () => {
  cy.get("#dashboard").should("be.visible");
});
```
