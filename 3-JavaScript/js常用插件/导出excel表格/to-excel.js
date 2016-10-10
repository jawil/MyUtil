
/**
使用示例 自动绑定 table_to_excel
<a href="#" download="交易记录.xls"class="to_excel fjgl_top_r_05">导出</a>

$(".to_excel").click(function(event){
    var t = Itable2excel({
        worksheet:'数据分析',
        table: $('#order-list table')
    });
    var data64 = t.uri();
    if(data64==false)
        return false;
    event.currentTarget.href = data64;
});


 */
(function($,win,dom,undef){

    var tmp  = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"></meta><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{{worksheet}}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{{tables}}</body></html>';

    var Itable2excel=function(settings){
        this.settings = $.extend({},Itable2excel.defaults,settings);
        this.template = '';
        //this.data64 = '';
        //执行
        this.run=function(){
            this.exportHandler();
            return this;
        }
    };

    /**
     * 弹出框 默认配置 可扩展
     * @type {Object}
     */
    Itable2excel.defaults={
        worksheet:'Worksheet',
        table:[],
    };

    Itable2excel.prototype={
        //输出base64的excel下载资源
        uri:function() {
            if($(this.template).find('tbody tr').length==0)
                return false;
            var uri = 'data:application/vnd.ms-excel;base64,';
                return uri + this.base64();
        },

        base64:function() {
            return window.btoa(unescape(encodeURIComponent(this.template)));

        },
        //对话框本身事件绑定
        exportHandler:function(){
            var table_str = '';
            //数据过滤
            $.each( this.settings.table, function(i){
                var t = $('<div><table><thead></thead><tbody></tobdy></table></div>');
                t.find('thead').html($(this.tHead).html());
                t.find('tbody').append($(this.tBodies).children(':visible').clone());
                t.find('.not-print').remove();          // not-print 是@media print中不会打印的部分
                t.find('img').remove();                 //图片过滤
                t.find('.table_search').remove();       //搜索栏过滤

                t.find('a').replaceWith(function (i) {  //表格中不再需要的超链接也移除
                    return this.innerHTML;
                });
                table_str +=t.html();
            });
            this.template = tmp.replace(/\{\{tables\}\}/g, table_str);
            this.template = this.template.replace(/\{\{worksheet\}\}/g, this.settings.worksheet);
        },
    };



    win['Itable2excel']=function(settings){
        var obj = new Itable2excel(settings);
        return obj.run();
    };


})(jQuery,window,document);
