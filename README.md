# testcafe-vue-selectors

This plugin provides selector extensions that make it easier to test Vue components with [TestCafe](https://github.com/DevExpress/testcafe).
These extensions allow you to test Vue component state and result markup together.

## Install

`$ npm install testcafe-vue-selectors`

## Usage

#### Create selectors for Vue components

`VueSelector` allows you to select page elements by the component tagName or the nested component tagNames.
For instance, you can create Vue selectors as follows

```js
VueSelector('list')
VueSelector('list list-item')
VueSelector() // returns the root Vue instance
```

You can combine Vue selectors with testcafe `Selector` filter functions like `.withText`, `.nth` and [other](http://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html#functional-style-selectors).

```js
import VueSelector from 'testcafe-vue-selectors';

fixture `Vue application testing`
    .page('http://localhost:1337');

test('Add new item', async t => {
    const addButton = VueSelector('add-item-button');

    await t.click(addButton);

    const itemLabel = VueSelector('label')

    await t.expect(itemLabel.textContent).eql('New Item');
});
```

#### Obtaining component's props, computed and state

In additional to [DOM Node State](http://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/dom-node-state.html), you can obtain `state`, `computed` or `props` of a Vue component. You can use them in an assertion directly thus simplifying assertion logic.
To get these data, use the Vue selector’s .getVue() method.

If you call this method without parameters, it returns an object of the following structure.
```js
{
    props:    <component_props>,
    state:    <component_state>,
    computed: <component_computed>
}
```


Example
```js
import VueSelector from 'testcafe-vue-selectors';

fixture `Vue application testing`
    .page('http://localhost:1337');

test('check StatusBar state', async t => {
    const statusBarVue = await VueSelector('status-bar').getVue();

    await t
        .expect(statusBarVue.props.theme).eql('default')
        .expect(statusBarVue.computed.displayText).eql('[date]: my text')
        .expect(statusBarVue.state.text).eql('my text');
});
```

As an alternative, the `.getVue()` method can take a function that returns the required data. This function acts as a filter. Its argument is an object returned by `.getVue()`, i.e. `{ props: ..., state: ..., computed:...}`.
```js
VueSelector('Component').getVue(({ props, state, computed }) => {...})
```
Example
```js
import VueSelector from 'testcafe-vue-selectors';

fixture `Vue application testing`
    .page('http://localhost:1337');

test('check ListItem5', async t => {
    const listItem       = VueSelector('list list-item');
    const listItemVue5Id = listItem.nth(4).getVue(({ props }) => props.id);

    await t.expect(listItemVue5Id).eql('list2-item2');
});
```
The `.getVue()` method can be called for the VueSelector or the snapshot this selector returns.

#### Limitations
`testcafe-vue-selectors` support Vue starting with version 2.

Only props, state and computed parts of a Vue component are avalible.

To check if a component can be found, use the [vue-dev-tools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) extension for a Google Chrome.

Supported pages only with one Vue root.
