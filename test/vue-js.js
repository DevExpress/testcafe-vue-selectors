import VueSelector from '../lib';
import { ClientFunction } from 'testcafe';

fixture `vue-js`
    .page `http://localhost:8080/test/data/vue-js/`;

test('root node', async t => {
    const root    = VueSelector();
    const rootVue = await root.getVue();

    await t
        .expect(root.exists).ok()
        .expect(rootVue.state.rootProp1).eql(1);
});

test('selector', async t => {
    const list    = VueSelector('list');
    const listVue = await list.getVue();

    await t
        .expect(list.count).eql(2)
        .expect(VueSelector('list-item').count).eql(6)
        .expect(listVue.props.id).eql('list1')
        .expect(listVue.computed.reversedId).eql('1tsil');
});

test('composite selector', async t => {
    const listItem       = VueSelector('list list-item');
    const listItemVue6   = await listItem.nth(5).getVue();
    const listItemVue5Id = listItem.nth(4).getVue(({ props }) => props.id);

    await t
        .expect(listItem.count).eql(6)
        .expect(listItemVue6.props.id).eql('list2-item3')
        .expect(listItemVue5Id).eql('list2-item2');
});

test('should throw exception for non-valid selectors', async t => {
    for (const selector of [null, false, {}, 42]) {
        try {
            await VueSelector(selector);
            await t.expect(false).ok('The selector should throw an error but it doesn\'t.');
        }
        catch (e) {
            await t.expect(e.errMsg).contains(`If the selector parameter is passed it should be a string, but it was ${typeof selector}`);
        }
    }
});

test('supported version', async t => {
    await ClientFunction(() => window.Vue.version = '1.0.28')();

    try {
        await VueSelector();
    }
    catch (e) {
        await t.expect(e.errMsg).contains('testcafe-vue-selectors supports Vue version 2.x and newer');
    }
});
