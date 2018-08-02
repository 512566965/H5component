/* 散点图表组件对象 */

var H5ComponentPoint =function ( name, cfg ) {
    var component = new H5ComponentBase( name , cfg );

    var base = cfg.data[0][1]; // 以第一个数据的 比例为大小的100%

    // 输出每个 Point
    $.each( cfg.data, function( idx, item ){

        var point = $('<div class="point point_'+idx+'">');

        point.text(item[0]+'_'+item[1]);

        var per = (item[1]/base * 100) + '%';

        point.width('100%').height('100%');

        component.append( point );

    });

    return component;
}