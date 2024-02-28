'use strict';

(function($){

  $(function() {

    var dataset = [
      { id: 1, name: 'ELECTRONICS', parent_id: null },
      { id: 2, name: 'TELEVISIONS', parent_id: 1 },
      { id: 3, name: 'TUBE', parent_id: 2 },
      { id: 4, name: 'LCD', parent_id: 2 },
      { id: 5, name: 'PLASMA', parent_id:  2 },
      { id: 6, name: 'PORTABLE ELECTRONICS', parent_id: 1 },
      { id: 7, name: 'MP3 PLAYERS', parent_id: 6 },
      { id: 8, name: 'FLASH', parent_id: 7 },
      { id: 9, name: 'CD PLAYERS', parent_id: 6 },
      { id: 10, name: '2 WAY RADIOS', parent_id: 6 }
    ];

    var datasource = {};

    dataset.forEach(function(item, index) {
      if (!item.parent_id) {
        delete item.parent_id;
        Object.assign(datasource, item);
      } else {
        var jsonloop = new JSONLoop(datasource, 'id', 'children');
        jsonloop.findNodeById(datasource, item.parent_id, function(err, node) {
          if (err) {
            console.error(err);
          } else {
            delete item.parent_id;
            if (node.children) {
              node.children.push(item);
              var b = 2;
            } else {
              node.children = [ item ];
              var a = 1;
            }
          }
        });
      }
    });

    $('#chart-container').orgchart({
      'data' : datasource,
      'parentNodeSymbol': 'fa-sitemap'
    });

  });

})(jQuery, JSONLoop);