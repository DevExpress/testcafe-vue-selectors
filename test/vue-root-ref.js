import VueSelector from '../lib';

fixture `vue-root-ref`
    .page `http://localhost:8080/test/data/vue-root-ref/`;

test('VueSelector(\'Table\', \'ref\')', async t => {
    const table1 = VueSelector('Table', 'table-1').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });
  
    const table2 = VueSelector('Table', 'table-2').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });
  
    await t
        .expect(table1.count).eql(1)
        .expect(table1.outerHTML).contains('Sachin')
        .expect(table1.outerHTML).contains('Yuvraj')
        .expect(table1.outerHTML).contains('Rahul')
        .expect(table1.outerHTML).notContains('Messi')
        .expect(table1.outerHTML).notContains('Ronaldo')
        .expect(table1.outerHTML).notContains('David')

        .expect(table2.count).eql(1)
        .expect(table2.outerHTML).contains('Messi')
        .expect(table2.outerHTML).contains('Ronaldo')
        .expect(table2.outerHTML).contains('David')
        .expect(table2.outerHTML).notContains('Sachin')
        .expect(table2.outerHTML).notContains('Yuvraj')
        .expect(table2.outerHTML).notContains('Rahul');
});

test('VueSelector(\'Row\', \'ref\', \'root-ref\')', async t => {
    const row1Table1    = VueSelector('Row', 'row-1', 'table-1').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });
    const row2Table1    = VueSelector('Row', 'row-2', 'table-1').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });
    const row3Table1    = VueSelector('Row', 'row-3', 'table-1').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });
    const row1Table2    = VueSelector('Row', 'row-1', 'table-2').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });
    const row2Table2    = VueSelector('Row', 'row-2', 'table-2').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });
    const row3Table2    = VueSelector('Row', 'row-3', 'table-2').addCustomDOMProperties({
        outerHTML: el => el.outerHTML
    });

    await t
        .expect(row1Table1.count).eql(1)
        .expect(row1Table1.outerHTML).contains('Sachin')
        .expect(row1Table1.outerHTML).notContains('Messi')
        .expect(row1Table2.count).eql(1)
        .expect(row1Table2.outerHTML).contains('Messi')
        .expect(row1Table2.outerHTML).notContains('Sachin')
        .expect(row2Table1.count).eql(1)
        .expect(row2Table1.outerHTML).contains('Yuvraj')
        .expect(row2Table1.outerHTML).notContains('Ronaldo')
        .expect(row2Table2.count).eql(1)
        .expect(row2Table2.outerHTML).contains('Ronaldo')
        .expect(row2Table2.outerHTML).notContains('Messi')
        .expect(row3Table1.count).eql(1)
        .expect(row3Table1.outerHTML).contains('Rahul')
        .expect(row3Table1.outerHTML).notContains('David')
        .expect(row3Table2.count).eql(1)
        .expect(row3Table2.outerHTML).contains('David')
        .expect(row3Table2.outerHTML).notContains('Rahul');

});
 
test('VueSelector(\'Row\', false, \'root-ref\')', async t => {
    const rowsTable1    = VueSelector('Row', false, 'table-1');
    const rowsTable2    = VueSelector('Row', false, 'table-2');
    const table1Names = ['Sachin', 'Yuvraj', 'Rahul'];
    const table2Names = ['Messi', 'Ronaldo', 'David'];

    await t
        .expect(rowsTable1.count).eql(3)
        .expect(rowsTable2.count).eql(3);

    for (let i = 0; i < rowsTable1.count; i++) {
        const row = rowsTable1.nth(i).addCustomDOMProperties({
            outerHTML: el => el.outerHTML
        });

        await t
            .expect(row.outerHTML).contains(table1Names[i]);
    }

    for (let i = 0; i < rowsTable2.count; i++) {
        const row = rowsTable2.nth(i).addCustomDOMProperties({
            outerHTML: el => el.outerHTML
        });

        await t
            .expect(row.outerHTML).contains(table2Names[i]);
    }
});
