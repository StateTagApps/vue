import { Selector } from 'testcafe';

fixture `Check Page Title`
    .page `http://localhost:8080`; // replace with your application's URL

test('Page should have title "State Example"', async t => {
    await t
        .expect(Selector('h1').innerText).eql('State Example');
});

test('Input field should contain certain text.', async t => {
    const inputField = Selector('input').nth(0); // replace with your input field selector
    await t
        .expect(inputField.value).contains('This text is inside state.js.');
});
