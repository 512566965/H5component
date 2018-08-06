/* 柱状图表组件对象 */

var H5ComponentBar =function ( name, cfg ) {
    var component = new H5ComponentBase( name , cfg );

   

    // 输出每个 Bar
    $.each( cfg.data, function( idx, item ){

        var line = $('<div class="line">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var per = $('<div class="per">');

        var width = item[1]*100 + '%';

        name.text(item[0]);

        rate.width( width );

        var  bgStyle = '';
        if( item[2] ){
        bgStyle = 'style="background-color:'+item[2]+'"';
        }
        rate.html( '<div class="bg" '+bgStyle+'></div>' );

        per.text(width);

        line.append( name ).append( rate ).append( per )

        component.append( line );

    });

    return component;
}