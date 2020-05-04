describe('Frontend ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('RADIO TRACKLIST REPORTING');
    cy.contains('Log in');
  });

  it('user can login', function () {
    cy.get('#login-username').type('test');
    cy.get('#login-password').type('test');
    cy.get('#login-button').click();

    cy.contains('Create a new report');
  });
});
