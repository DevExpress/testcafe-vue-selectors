import VueSelector from '../lib';

fixture `vue-loader`
    .page `http://localhost:8080/test/data/vue-loader/`;

test('composite selector', async t => {
    const listItem       = VueSelector('list list-item');
    const listItemVue6   = await listItem.nth(5).getVue();
    const listItemVue5Id = listItem.nth(4).getVue(({ props }) => props.id);

    await t
        .expect(listItem.count).eql(6)
        .expect(listItemVue6.props.id).eql('list2-item3')
        .expect(listItemVue5Id).eql('list2-item2');
});
