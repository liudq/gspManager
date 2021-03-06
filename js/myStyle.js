function buildDomTree() {
         
        var data = [];

        function walk(nodes, data) {
          if (!nodes) { return; }
          $.each(nodes, function (id, node) {
            var obj = {
              id: id,
              text: node.nodeName + " - " + (node.innerText ? node.innerText : ''),
              //tags: [node.childElementCount > 0 ? node.childElementCount + ' child elements' : '']
            };
            if (node.childElementCount > 0) {
              obj.nodes = [];
              walk(node.children, obj.nodes);
            }
            data.push(obj);
          });
        }

        walk($('html')[0].children, data);
        return data;
      }

  		$(function() {

        var options = {
          bootstrap2: false, 
          showTags: true,
          levels: 5,
          data: buildDomTree()
        };

  			$('#treeview').treeview(options);
  		});
