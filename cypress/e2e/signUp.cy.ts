import { StatusCodes } from 'http-status-codes';

const getFirstNameInput = () => cy.get('[data-testid="firstNameInput"]');
const getLastNameInput = () => cy.get('[data-testid="lastNameInput"]');
const getEmailInput = () => cy.get('[data-testid="emailInput"]');
const getPasswordInput = () => cy.get('[data-testid="passwordInput"]');
const getSignUpButton = () => cy.get('[data-testid="signUpButton"]');
const getMessageAlert = () => cy.get('[data-testid="messageAlert"]');

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should appear message of first name is required when first name is submitted empty', () => {
    getSignUpButton().click();
    getFirstNameInput().contains('O campo é obrigatório');
  });

  it('should appear message of last name is required when last name is submitted empty', () => {
    getSignUpButton().click();
    getLastNameInput().contains('O campo é obrigatório');
  });

  it('should appear message of email is required when email is submitted empty', () => {
    getSignUpButton().click();
    getEmailInput().contains('O campo é obrigatório');
  });

  it('should appear message of email is invalid when email is submitted empty', () => {
    getEmailInput().type('invalid-email');
    getSignUpButton().click();
    getEmailInput().contains('Endereço de email inválido');
  });

  it('should appear message of password is required when password is submitted empty', () => {
    getSignUpButton().click();
    getPasswordInput().contains('O campo é obrigatório');
  });

  it('should appear message of password is too short when password is submitted empty', () => {
    getPasswordInput().type('12345678');
    getSignUpButton().click();
    getPasswordInput().contains('A senha deve conter pelo menos 9 caracteres');
  });

  it('should appear message of email already taken', () => {
    cy.intercept('/signUp', { statusCode: StatusCodes.BAD_REQUEST });
    getFirstNameInput().type('João');
    getLastNameInput().type('Silva');
    getEmailInput().type('joao@gmail.com');
    getPasswordInput().type('123456789');
    getSignUpButton().click();
    getMessageAlert().should('be.visible').contains('O email já está em uso');
  });

  it('should appear message of server error', () => {
    cy.intercept('/signUp', { statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
    getFirstNameInput().type('João');
    getLastNameInput().type('Silva');
    getEmailInput().type('joao@gmail.com');
    getPasswordInput().type('123456789');
    getSignUpButton().click();
    getMessageAlert()
      .should('be.visible')
      .contains('Ocorreu um erro inesperado');
  });

  it('should sign up', () => {
    cy.intercept('/signUp', { statusCode: StatusCodes.NO_CONTENT });
    getFirstNameInput().type('João');
    getLastNameInput().type('Silva');
    getEmailInput().type('joao@gmail.com');
    getPasswordInput().type('123456789');
    getSignUpButton().click();
    getMessageAlert()
      .should('be.visible')
      .contains('A sua conta foi criada com sucesso');
  });
});
