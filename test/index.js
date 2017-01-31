import VueSelector from '../lib';
import { ClientFunction } from 'testcafe';

fixture `VueSelector`
    .page('http://localhost:8080/test/data');

test('should throw exception for non-valid selectors', async t => {
    for (const selector of [null, false, {}, 42]) {
        try {
            VueSelector(selector);
        }
        catch (e) {
            await t.expect(e.message).eql(`If selector option is present it should be a string, but it was ${typeof selector}`);
        }
    }
});

test('there is no Vue on the tested page', async t => {
    await ClientFunction(() => window.Vue = null)();

    const body = await VueSelector('body');

    console.log(JSON.stringify(body));

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
    const listItemVue6 = await VueSelector('list list-item').nth(5).vue;

    await t.expect(VueSelector('list list-item').count).eql(6)
        .expect(listItemVue6.props.id).eql('list2-item3');
});

