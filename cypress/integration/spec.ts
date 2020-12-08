it('pastes text to textarea', () => {

  const textToPaste = 'this is not a valid email';

  cy
    .visit('index.html');

  cy
    .get('[type=\'email\']')
    .invoke('val', textToPaste)

});
