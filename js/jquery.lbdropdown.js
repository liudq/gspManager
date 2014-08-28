/*
 *  使用方法
 *  [
 *    'url': 'data.json',
 *    'val': 'productid' 
 *  ]
 *
 */

;(function($){
    $.fn.extend({
        lbdropdown : function(options){
            var defaults = {
                'url': 'js/data.json',
                'val': 'productid',
                'fun': function(){}
            }
            var ops = $.extend(defaults, options);
            var $dom = this;
            if(!$dom.get(0)){ return false; }

            function createTable(obj){
                var html = '';
                html = html + '<table class="table table-bordered table-hover table-striped table-condensed table-striped2">';
                html = html + '<tr class="form-group">';
                for(var i in obj[0]){
                    html = html + '<th>' + i + '</th>';
                };
                html = html + '</tr>';
                for(var i = 0 ; i < obj.length; i++){
                    html = html + '<tr class="form-group">';
                        for(var j in obj[i]){
                            if(j == ops.val){
                                html = html + '<td class="key">' + obj[i][j] +'</td>';
                            }else{
                                html = html + '<td>' + obj[i][j] +'</td>';
                            }
                        }
                    html = html + '</tr>';
                }
                html = html + '</table>';
                return html;
            }

            $dom.click(function(){
                $('.table-wrap').is(':visible') ? $('.table-wrap').hide() : $('.table-wrap').show();
                var stateReady = false;
                var date = new Date();
                $.getJSON(ops.url +'?'+date, function(response, status, xhr){
                    var data = createTable(response);
                    $('.table-wrap').html(data);
                    $('.table-wrap').find('td').on('click', function(event){
                        var text = $(this).parent('tr').find('.key').text();
                        $dom.find('.form-control').val(text);
                    });
                });
            });
            return $dom;
        }
    })
}(jQuery));