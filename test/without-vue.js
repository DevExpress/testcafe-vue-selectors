import VueSelector from '../lib';
import { Selector } from 'testcafe';

fixture `VueSelector on simple page`
    .page `http://localhost:8080/test/data/simple-page/`;

test('there is no Vue on the tested page', async t => {
    const listVueSelector = VueSelector('list');
    const listSelector    = Selector('list');

    await t
        .expect(listVueSelector.count).eql(0)
        .expect(listSelector.count).eql(2);
});
