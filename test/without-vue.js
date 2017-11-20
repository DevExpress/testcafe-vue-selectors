import VueSelector from '../lib';

fixture `page without vue`;

test('there is no Vue on the tested page', async t => {
    const listVueSelector = VueSelector('list');

    await t.expect(listVueSelector.count).eql(0);
});
