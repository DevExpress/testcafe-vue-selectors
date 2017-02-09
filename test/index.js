import VueSelector from '../lib';
import { ClientFunction } from 'testcafe';

fixture `VueSelector`
    .page('http://localhost:8080/test/data');

test('root node', async t => {
    const rootVue = await VueSelector().vue;

    await t.expect(VueSelector().exists).ok()
        .expect(rootVue.state.rootProp1).eql(1);
});

test('selector', async t => {
    const listVue = await VueSelector('list').vue;

    await t.expect(VueSelector('list').count).eql(2)
        .expect(VueSelector('list-item').count).eql(6)
        .expect(listVue.props.id).eql('list1')
        .expect(listVue.computed.reversedId).eql('1tsil');
});

test('composite selector', async t => {
    const listItem = VueSelector('list list-item');

    await t.expect(listItem.count).eql(6);

    const listItemVue6 = await listItem.nth(5).vue;

    await t.expect(listItemVue6.props.id).eql('list2-item3');
});

test.skip('Selector.getVueProperty', async t => {
    // Current API
    const listVue = await VueSelector('list').vue;

    await t.expect(listVue.props.id).eql('list1');

    // New API
    // Will be done after https://github.com/DevExpress/testcafe/issues/1212
    await t.expect(VueSelector('list').getVueProperty('id')).eql('list1');
});

test('should throw exception for non-valid selectors', async t => {
    for (const selector of [null, false, {}, 42]) {
        try {
            VueSelector(selector);
        }
        catch (e) {
            await t.expect(e.message).eql(`If the selector parameter is passed it should be a string, but it was ${typeof selector}`);
        }
    }
});

test('there is no Vue on the tested page', async t => {
    await ClientFunction(() => window.Vue = null)();

    const body = await VueSelector('body');

    await t.expect(body.tagName).eql('body');
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
