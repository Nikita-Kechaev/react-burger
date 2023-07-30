describe('Страница конструктора работает корректно', () => {
  beforeEach('passes', () => {
    cy.viewport(1300, 800)
    cy.visit('http://localhost:3000/react-burger/')
  })

  it('проверяем содержание страницы конструктора', () => {
    cy.contains('Соберите бургер')
    cy.contains('добавьте булку')
  })

  it('проверяем открытие модального окна ингредиента', () => {
    cy.get('[data-cy="ingredientsContainer"]').children().eq(0).click()
    cy.get('[data-cy="modelContainer"]').should('contain', 'Детали ингредиента')
    cy.get('[data-cy="modelContainer"]').should('contain', 'Краторная булка N-200i')
    cy.get('[data-cy="closeButton"]').click()
    cy.get('[data-cy="modelContainer"]').should('not.exist')
  })

  it('проверяем перетаскивание ингредиентов и удаление игредиентов из заказа', () => {
    cy.get('[data-cy="ingredientsContainer"]').children().eq(1).as('bun')
    cy.get('[data-cy="ingredientsContainer"]').children().eq(2).as('souce')
    cy.get('[data-cy="ingredientsContainer"]').children().eq(3).as('souce1')

    cy.get('[data-cy="dropContainer"]').as('dropContainer')

    cy.get('@bun').trigger('dragstart')
    cy.get('@dropContainer').trigger('dragenter').trigger('drop')

    cy.get('[data-cy="bunDropContainer"]').as('bunDropContainer')
    cy.get('@bunDropContainer').should('contain', 'Флюоресцентная булка R2-D3');

    cy.get('@souce').trigger('dragstart')
    cy.get('@dropContainer').trigger('dragenter').trigger('drop')

    cy.get('@souce1').trigger('dragstart')
    cy.get('@dropContainer').trigger('dragenter').trigger('drop')

    cy.get('[data-cy="mainDropContainer"]').as('mainDropContainer')
    cy.get('@mainDropContainer').should('contain', 'Соус Spicy-X');

    cy.get('@mainDropContainer').children().eq(0).find('svg').click({ multiple: true} )
    cy.get('@mainDropContainer').children().eq(0).find('svg').click({ multiple: true} )

    cy.get('@mainDropContainer').should('not.contain', 'Соус Spicy-X');
  })

  it('проверяем оформление заказа и закрытие модального окна заказа', () => {
    cy.get('[data-cy="ingredientsContainer"]').children().eq(1).as('bun')
    cy.get('[data-cy="ingredientsContainer"]').children().eq(2).as('souce')
    cy.get('[data-cy="dropContainer"]').as('dropContainer')
    cy.get('@bun').trigger('dragstart')
    cy.get('@dropContainer').trigger('dragenter').trigger('drop')
    cy.get('[data-cy="bunDropContainer"]').as('bunDropContainer')
    cy.get('@souce').trigger('dragstart')
    cy.get('@dropContainer').trigger('dragenter').trigger('drop')

    cy.get('button').contains('Оформить заказ').click();
    cy.get('input[type=email]').type(Cypress.env('email'));
    cy.get('input[type=password]').type(Cypress.env('password'));
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('orders');
    cy.wait('@orders', { timeout: 16000 }).its('response.body.order.number').then((number) => {
      cy.contains(number)
    })

    cy.get('[data-cy="closeButton"]').click()
    cy.get('[data-cy="modelContainer"]').should('not.exist')
  })
})