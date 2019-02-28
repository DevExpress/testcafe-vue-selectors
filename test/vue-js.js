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

test('receive ref of vue element on getVue', async t => {
    const list = VueSelector('list');
    
    await t 
        .expect(list.count).eql(2);
    
    for (let iter = 0; iter < list.count; iter++ ) {
        const listVue = list.nth(iter).getVue();

        await t
            .expect(listVue.ref).eql('list' + iter);
    }
});

test('selector with reference', async t => {
    const list1 = VueSelector('list', 'list1');
    const list1Vue = await list1.getVue();
    const list2 = VueSelector('list', 'list2');
    const list2Vue = await list2.getVue();

    await t
        .expect(list1.count).eql(1)
        .expect(list1Vue.props.id).eql('list1')
        .expect(list1Vue.computed.reversedId).eql('1tsil')
        .expect(list2.count).eql(1)
        .expect(list2Vue.props.id).eql('list2')
        .expect(list2Vue.computed.reversedId).eql('2tsil');
});

test('selector with root reference', async t => {
    const list1Items = VueSelector('list-item', false, 'list1');

    await t
        .expect(list1Items.count).eql(3);
});


test('selector with reference and rootreference', async t => {
    const list1Item1 = VueSelector('list-item', 'list-item-1', 'list1');
    const list1Item1Vue = await list1Item1.getVue();

    await t
        .expect(list1Item1.count).eql(1)
        .expect(list1Item1Vue.props.id).eql('list1-item1');
});

test('should throw error when non-valid reference', async t => {
    const selector = 'list';

    for (const reference of [{}, 42]) {
        try {
            await VueSelector(selector, reference);
            await t.expect(false).ok('The reference should throw an error but it doesn\'t.');
        }
        catch (e) {
            await t.expect(e.errMsg).contains(`If the reference parameter is passed it should be a string or false or null, but it was ${typeof reference}`);
        }
    }
});

test('should throw error when non-valid root reference', async t => {
    const selector = 'list-item';
    const reference = 'list-item-1';

    for (const rootReference of [{}, 42]) {
        try {
            await VueSelector(selector, reference, rootReference);
            await t.expect(false).ok('The root reference should throw an error but it doesn\'t.');
        }
        catch (e) {
            await t.expect(e.errMsg).contains(`If the root reference parameter is passed it should be a string or false or null, but it was ${typeof rootReference}`);
        }
    }

    const rootReference = 'no-list';

    try {
        await VueSelector(selector, reference, rootReference);
        await t.expect(false).ok('The root reference should throw an error but it doesn\'t.');
    }
    catch (e) {
        await t.expect(e.errMsg).contains('Invalid reference no-list for root vue element');
    }
});

