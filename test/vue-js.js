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

test('VueSelector(\'ref:list-n\')', async t => {
    const list1    = VueSelector('ref:list-1');
    const list1Vue = await list1.getVue();
    const list2    = VueSelector('ref:list-2');
    const list2Vue = await list2.getVue();

    await t
        .expect(list1.count).eql(1)
        .expect(list1Vue.ref).eql('list-1')
        .expect(list1Vue.props.id).eql('list1')
        .expect(list1Vue.computed.reversedId).eql('1tsil')
        .expect(list2.count).eql(1)
        .expect(list2Vue.ref).eql('list-2')
        .expect(list2Vue.props.id).eql('list2')
        .expect(list2Vue.computed.reversedId).eql('2tsil');
});

test('VueSelector(\'list ref:list-item-n\')', async t => {
    const listItems1    = VueSelector('list ref:list-item-1');
    const list1Item1Vue = await listItems1.nth(0).getVue();
    const list2Item1Vue = await listItems1.nth(1).getVue();
    const listItems2    = VueSelector('list ref:list-item-2');
    const list1Item2Vue = await listItems2.nth(0).getVue();
    const list2Item2Vue = await listItems2.nth(1).getVue();
    const listItems3    = VueSelector('list ref:list-item-3');
    const list1Item3Vue = await listItems3.nth(0).getVue();
    const list2Item3Vue = await listItems3.nth(1).getVue();

    await t
    .expect(listItems1.count).eql(2)
    .expect(list1Item1Vue.ref).eql('list-item-1')
    .expect(list1Item1Vue.props.id).eql('list1-item1')
    .expect(list2Item1Vue.ref).eql('list-item-1')
    .expect(list2Item1Vue.props.id).eql('list2-item1')
    .expect(listItems2.count).eql(2)
    .expect(list1Item2Vue.ref).eql('list-item-2')
    .expect(list1Item2Vue.props.id).eql('list1-item2')
    .expect(list2Item2Vue.ref).eql('list-item-2')
    .expect(list2Item2Vue.props.id).eql('list2-item2')
    .expect(listItems3.count).eql(2)
    .expect(list1Item3Vue.ref).eql('list-item-3')
    .expect(list1Item3Vue.props.id).eql('list1-item3')
    .expect(list2Item3Vue.ref).eql('list-item-3')
    .expect(list2Item3Vue.props.id).eql('list2-item3');
});

test('VueSelector(\'ref:list-n list-item\')', async t => {
    const list1Items    = VueSelector('ref:list-1 list-item');
    const list1Item1Vue = await list1Items.nth(0).getVue();
    const list1Item2Vue = await list1Items.nth(1).getVue();
    const list1Item3Vue = await list1Items.nth(2).getVue();
    const list2Items    = VueSelector('ref:list-2 list-item');
    const list2Item1Vue = await list2Items.nth(0).getVue();
    const list2Item2Vue = await list2Items.nth(1).getVue();
    const list2Item3Vue = await list2Items.nth(2).getVue();

    await t
        .expect(list1Items.count).eql(3)
        .expect(list1Item1Vue.ref).eql('list-item-1')
        .expect(list1Item1Vue.props.id).eql('list1-item1')
        .expect(list1Item2Vue.ref).eql('list-item-2')
        .expect(list1Item2Vue.props.id).eql('list1-item2')
        .expect(list1Item3Vue.ref).eql('list-item-3')
        .expect(list1Item3Vue.props.id).eql('list1-item3')
        .expect(list2Items.count).eql(3)
        .expect(list2Item1Vue.ref).eql('list-item-1')
        .expect(list2Item1Vue.props.id).eql('list2-item1')
        .expect(list2Item2Vue.ref).eql('list-item-2')
        .expect(list2Item2Vue.props.id).eql('list2-item2')
        .expect(list2Item3Vue.ref).eql('list-item-3')
        .expect(list2Item3Vue.props.id).eql('list2-item3');
});

test('VueSelector(\'ref:list-n ref:list-item-n\')', async t => {
    const list1Item1    = VueSelector('ref:list-1 ref:list-item-1');  
    const list1Item2    = VueSelector('ref:list-1 ref:list-item-2');
    const list1Item3    = VueSelector('ref:list-1 ref:list-item-3');
    const list2Item1    = VueSelector('ref:list-2 ref:list-item-1');  
    const list2Item2    = VueSelector('ref:list-2 ref:list-item-2');
    const list2Item3    = VueSelector('ref:list-2 ref:list-item-3');
    const list1Item1Vue = await list1Item1.getVue();
    const list1Item2Vue = await list1Item2.getVue();
    const list1Item3Vue = await list1Item3.getVue();
    const list2Item1Vue = await list2Item1.getVue();
    const list2Item2Vue = await list2Item2.getVue();
    const list2Item3Vue = await list2Item3.getVue();


    await t
        .expect(list1Item1.count).eql(1)
        .expect(list1Item1Vue.ref).eql('list-item-1')
        .expect(list1Item1Vue.props.id).eql('list1-item1')
        .expect(list1Item2.count).eql(1)
        .expect(list1Item2Vue.ref).eql('list-item-2')
        .expect(list1Item2Vue.props.id).eql('list1-item2')
        .expect(list1Item3.count).eql(1)
        .expect(list1Item3Vue.ref).eql('list-item-3')
        .expect(list1Item3Vue.props.id).eql('list1-item3')
        .expect(list2Item1.count).eql(1)
        .expect(list2Item1Vue.ref).eql('list-item-1')
        .expect(list2Item1Vue.props.id).eql('list2-item1')
        .expect(list2Item2.count).eql(1)
        .expect(list2Item2Vue.ref).eql('list-item-2')
        .expect(list2Item2Vue.props.id).eql('list2-item2')
        .expect(list2Item3.count).eql(1)
        .expect(list2Item3Vue.ref).eql('list-item-3')
        .expect(list2Item3Vue.props.id).eql('list2-item3');
});

test('should throw exception for non-valid ref-selectors', async t => {
    for (const selector of ['ref:', 'list ref:', 'listref:list-1']) {
        try {
            await VueSelector(selector);
            await t.expect(false).ok('The selector should throw an error but it doesn\'t.');
        }
        catch (e) {
            await t
            .expect(e.errMsg).contains('If the ref is passed as selector it should be in the format \'ref:ref-selector\'');
        }
    }
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
