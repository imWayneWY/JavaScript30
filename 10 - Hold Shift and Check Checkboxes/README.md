# day10 Hold Shift and Check Checkboxes
18/6/11

- 由于要多选出两个checkbox之间的元素，因此必定要设置一个变量存储第一个checkbox，在此设为lastone，只有当lastone存在并处于选中状态，并且再次点击使该元素处于选中状态，并同时同时按下shift键时，才能继续执行，选中中间的元素。
- 若要想知道哪些元素在两个元素中间，可以通过是指一个flag标识，此例为inbetween，默认为false，表示不在两元素中间。遍历所有的checkbox，当遇到lastone和this时，将inbetween的值取反，这样就可标出哪些在两元素中间，哪些不在。
- 但仅仅这样的话有一个问题就是，当我直接按住shift键点击页面上的一个元素的时候，该元素以下的所有元素都会被选中，只是因为this和lastone相同，他只将inbetween的值取反一次，所以该元素以下的所有元素全部会被选中。所以在将中间元素都选中的时候，加上一个判断，this !== lastone即可。
- 已经筛选出了哪些元素在所选两元素中间，哪些元素不在，就可以设置选中状态了，当inbetween为true时，将checkbox设置为选中状态。
