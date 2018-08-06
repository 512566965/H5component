/* 折线图表组件对象 */

var H5ComponentPolyline = function ( name, cfg ) {
    var component = new H5ComponentBase( name , cfg );
   
    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布(网格线背景)
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    // 水平网格线 100份 -> 10份
    var step =10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#AAAAAA";
    for(var i=0; i<step + 1; i++){
        var y = (h/step) * i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
        ctx.stroke();
    }

    // 垂直网格线 (根据项目的个数分)
    step = cfg.data.length + 1;
    for( var i=0; i<step + 1; i++){
        var x = (w/step) * i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        ctx.stroke();
        if(cfg.data[i]){
            var name = $('<div class="text">');
            name.text(cfg.data[i][0]);
            component.append(name);
            name.width((w/step >> 0)/2 );
            name.css('left',x/2 + (w/step)/4)
        }
      
    }
    window.ctx = ctx;

    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    component.append(cns);  
    /**
     * 绘制折线以及对应的数据和阴影
     * @param {floot} per 0到1之间的数据,会根据这个值绘制最终数据对应的中间状态
     * @return {[type]} 
     * 
     */
    function draw(per){
        //  清空画布
        ctx.clearRect(0,0,w,h);
        //  加入画布 - 数据层
        
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff8878";
        // 画点
        for( i in cfg.data ){
            step = cfg.data.length + 1;
            x = (w/step) * i + w/step;
            y = h - cfg.data[i][1]*per * h;
            ctx.moveTo(x,y)        
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fillText(cfg.data[i][0],x,y-10);
        }
        var row_w = ( w / (cfg.data.length+1) );
        // 画线
        ctx.moveTo(0,h);
        for( i in cfg.data ){
            step = cfg.data.length + 1;
            x = (w/step) * i + w/step;
            y = h - cfg.data[i][1]*per * h;
            ctx.lineTo(x,y);
        }
        // 画阴影
        ctx.lineTo(w,h)
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0)";

        //  绘制阴影c
        ctx.lineTo(x,h);
        ctx.lineTo(row_w,h);
        ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';
        ctx.fill();
    }
    // draw(1)

    // 折线图生长动画
    
    component.on('onLoad',function(){
        var s = 0;
        for( i=0; i<100; i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10)
        }
    });
    component.on('onLeave',function(){
        var s = 1;
        for( i=0; i<100; i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10)
        }
    });

    return component;
}