it('pastes text to textarea', () => {

  const textToPaste = 'this is not a valid email';

  cy
    .visit('index.html');

  cy
    .get('[type=\'email\']')
    .invoke('val', textToPaste)
    .trigger('blur')

});

it('copies text from textarea (works in electron only)', () => {

  const textToCopy = 'Wubba lubba dub dub';

  cy
    .visit('index.html');

  cy
    .get('#copyText')
    .invoke('val', textToCopy)

  cy
    .get('button')
    .click()

  cy
    .task('getClipboard')
    .should('eq', textToCopy)

});

it('copies text from textarea (works with chrome)', () => {

  const textToCopy = 'Wubba lubba dub dub';

  cy
    .visit('index.html');

  cy
    .get('#copyText')
    .invoke('val', textToCopy)

  cy
    .get('#button')
    .realClick()

  cy
    .task('getClipboard')
    .should('eq', textToCopy)

});