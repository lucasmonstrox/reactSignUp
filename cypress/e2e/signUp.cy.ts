import { StatusCodes } from 'http-status-codes';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should appear message of first name is required when first name is submitted empty', () => {
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="firstName"]').contains('O campo é obrigatório');
  });

  it('should appear message of last name is required when last name is submitted empty', () => {
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="lastName"]').contains('O campo é obrigatório');
  });

  it('should appear message of email is required when email is submitted empty', () => {
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="email"]').contains('O campo é obrigatório');
  });

  it('should appear message of email is invalid when email is submitted empty', () => {
    cy.get('[data-testid="email"]').type('invalid-email');
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="email"]').contains('Endereço de email inválido');
  });

  it('should appear message of password is required when password is submitted empty', () => {
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="password"]').contains('O campo é obrigatório');
  });

  it('should appear message of password is too short when password is submitted empty', () => {
    cy.get('[data-testid="password"]').type('12345678');
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="password"]').contains(
      'A senha deve conter pelo menos 9 caracteres'
    );
  });

  it('should appear message of email already taken', () => {
    cy.intercept('/signUp', { statusCode: StatusCodes.BAD_REQUEST });
    cy.get('[data-testid="firstName"]').type('João');
    cy.get('[data-testid="lastName"]').type('Silva');
    cy.get('[data-testid="email"]').type('joao@gmail.com');
    cy.get('[data-testid="password"]').type('123456789');
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="alertMessage"]')
      .should('be.visible')
      .contains('O email já está em uso');
  });

  it('should appear message of server error', () => {
    cy.intercept('/signUp', { statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
    cy.get('[data-testid="firstName"]').type('João');
    cy.get('[data-testid="lastName"]').type('Silva');
    cy.get('[data-testid="email"]').type('joao@gmail.com');
    cy.get('[data-testid="password"]').type('123456789');
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="alertMessage"]')
      .should('be.visible')
      .contains('Ocorreu um erro inesperado');
  });

  it('should sign up', () => {
    cy.intercept('/signUp', { statusCode: StatusCodes.NO_CONTENT });
    cy.get('[data-testid="firstName"]').type('João');
    cy.get('[data-testid="lastName"]').type('Silva');
    cy.get('[data-testid="email"]').type('joao@gmail.com');
    cy.get('[data-testid="password"]').type('123456789');
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="alertMessage"]')
      .should('be.visible')
      .contains('A sua conta foi criada com sucesso');
  });
});
