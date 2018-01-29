import VueSelector from '../lib';

fixture `vue-router`
    .page `http://localhost:8080/test/data/vue-router/`;


const routerLinks = VueSelector('router-link');

test('selector', async t => {
    await t
        .expect(routerLinks.count).eql(2)
        .click(routerLinks.nth(0))
        .expect(VueSelector('foo').exists).ok()
        .expect(VueSelector('bar').exists).notOk()
        .click(routerLinks.nth(1))
        .expect(VueSelector('foo').exists).notOk()
        .expect(VueSelector('bar').exists).ok();
});


test('component properties', async t => {
    await t
        .click(routerLinks.nth(0))
        .expect(VueSelector('foo').exists).ok();

    const listItem       = VueSelector('list-item');
    const listItemVue2   = await listItem.nth(1).getVue();
    const listItemVue3Id = listItem.nth(2).getVue(({ props }) => props.id);

    await t
        .expect(listItem.count).eql(3)
        .expect(listItemVue2.props.id).eql('list-foo-1-item2')
        .expect(listItemVue3Id).eql('list-foo-1-item3');
});
