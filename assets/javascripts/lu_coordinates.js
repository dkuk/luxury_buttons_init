Raphael.fn.show_buttons = function() {
    show_status_btn(this);
};

Raphael.fn.hide_buttons = function(){
    $("#status_dropper").hide();
};

Raphael.fn.get_button_coordinate = function (path) {
    return path.getPointAtLength(path.getTotalLength()/2);
};

Raphael.fn.get_arrow_coordinate = function (path) {
    var totla_length = path.getTotalLength();
    return [path.getPointAtLength(totla_length/2+20), path.getPointAtLength(totla_length/2+25)];
};

Raphael.fn.get_arrow_rev_coordinate = function (path) {
    var total_length = path.getTotalLength();
    return [path.getPointAtLength(total_length/2-20), path.getPointAtLength(total_length/2-25)];
};

Raphael.fn.draw_arrow = function (c1, c2) {
    var size=7
    var x1=c1.x
    var x2=c2.x
    var y1=c1.y
    var y2=c2.y
    var angle = Math.atan2(x1-x2, y2-y1);
    angle = (angle / (2 * Math.PI)) * 360;
    return this.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size/2) + " L" + (x2 - size) + " " + (y2 + size/2) + " L" + x2 + " " + y2 )
                        .attr({stroke: "#fff", fill: "#fff"})
                        .rotate((90+angle),x2,y2);
    //this.circle(c1.x, c1.y, 2).attr({fill: "#ccc", stroke: "#fff", "stroke-width": 2})
};

Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } 
    else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");

    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
        var button_coordinates = this.get_button_coordinate(line.line);
        line.circle.attr({cx: button_coordinates.x, cy: button_coordinates.y});
    } 
    else {
        var color = typeof line == "string" ? line : "#000";
        var relation = this.path(path); 
        var button_coordinates = this.get_button_coordinate(relation);
        //circles[obj1.id] = [];
        //alert(obj1.id+"--"+obj2.id);
        //circles[obj1.id][obj2.id]=this.circle(button_coordinates.x, button_coordinates.y, 13).attr({fill: "#ccc", stroke: "#fff", "stroke-width": 2})
        return {
            bg: bg && bg.split && relation.attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: relation.attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2,
            circle: this.circle(button_coordinates.x, button_coordinates.y, cradius).attr({fill: "#ccc", stroke: "#fff", "stroke-width": 2})
        };
    }
};



$(document).ready(function(){

    cradius = 12;
    cdx = cradius;
    cdy = cradius;

    dragger = function () {
        this.title.hide();

        //Hide from connections
        for (var kk in this.moves) if (Object.prototype.hasOwnProperty.call(this.moves, kk)) {
            this.moves[kk].circle_text.hide();
            this.moves[kk].arrow_from.remove();
            if(typeof this.moves[kk].arrow_to != 'undefined')
                this.moves[kk].arrow_to.remove();
        }

        //Hide to connections
        for (var k in shapes) if (Object.prototype.hasOwnProperty.call(shapes, k)) {
            for (kk in shapes[k].moves) if (Object.prototype.hasOwnProperty.call(shapes[k].moves, kk)) {
                if(kk==this.id) {
                    shapes[k].moves[kk].circle_text.hide();
                    shapes[k].moves[kk].arrow_from.remove();
                    if(typeof shapes[k].moves[kk].arrow_to != 'undefined')
                        shapes[k].moves[kk].arrow_to.remove();                    
                }
            }
        }

        //Hide self moves
        if(typeof this.circle != 'undefined') {
            this.circle.hide();
            this.circle_text.hide();
        }

        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": .2}, 500);
    },

    move = function (dx, dy) {
        this.data('moved', true);

        hide_status_btn();

        if(typeof this.highlight != 'undefined')  { this.highlight.remove();}

        //this.getBBox().y+this.getBBox().height>r.height

        var x = (this.ox+dx+this.getBBox().width > r.width) ? r.width - this.getBBox().width - 2 : this.ox + dx
        x = (x<0) ? 0+2 : x

        var y = (this.oy+dy+this.getBBox().height > r.height) ? r.height - this.getBBox().height - 2 : this.oy + dy
        y = (y<0) ? 0+2 : y

        var att = this.type == "rect" ? {x: x, y: y} : {cx: this.ox + dx, cy: this.oy + dy};
        this.attr(att);
            
        for (var i = connections.length; i--;) {
            r.connection(connections[i]);
        }
        r.safari();
    },

    up = function () {
        this.title.show();
        this.animate({"fill-opacity": 0}, 500);

        //alert(this.title.getBBox().x)
        this.title.attr({x: this.getBBox().x+10, y: this.getBBox().y+20})

        //Show from connections
        for (var kk in this.moves) if (Object.prototype.hasOwnProperty.call(this.moves, kk)) {
            
            var arr_coor = r.get_arrow_coordinate(this.moves[kk].line);
            var arr_rev_coor = r.get_arrow_rev_coordinate(this.moves[kk].line);
            var mid_coord = r.get_button_coordinate(this.moves[kk].line);
            //alert(arr_coor[0].x)
            // this.moves[kk].circle_text.show().attr({x: this.moves[kk].circle.getBBox().x+cdx, y: this.moves[kk].circle.getBBox().y+cdy});
            this.moves[kk].circle_text.show().attr({x: mid_coord.x, y: mid_coord.y});            
            
            this.moves[kk].arrow_from = r.draw_arrow(arr_coor[0], arr_coor[1]);
            if(get_reverse_move_num(kk, this.id)>0)
                this.moves[kk].arrow_to = r.draw_arrow(arr_rev_coor[0], arr_rev_coor[1]);
        }

        //Show to connections
        for (var k in shapes) if (Object.prototype.hasOwnProperty.call(shapes, k)) {
            for (kk in shapes[k].moves) if (Object.prototype.hasOwnProperty.call(shapes[k].moves, kk))  {
                if(kk==this.id) {
                    var arr_coor = r.get_arrow_coordinate(shapes[k].moves[kk].line);
                    var arr_rev_coor = r.get_arrow_rev_coordinate(shapes[k].moves[kk].line);
                    var mid_coord = r.get_button_coordinate(shapes[k].moves[kk].line);
                    // shapes[k].moves[kk].circle_text.show().attr({x: shapes[k].moves[kk].circle.getBBox().x+cdx, y: shapes[k].moves[kk].circle.getBBox().y+cdy});
                    shapes[k].moves[kk].circle_text.show().attr({x: mid_coord.x, y: mid_coord.y});
                    shapes[k].moves[kk].arrow_from = r.draw_arrow(arr_coor[0], arr_coor[1]);
                    if(get_reverse_move_num(this.id, k)>0)
                        shapes[k].moves[kk].arrow_to = r.draw_arrow(arr_rev_coor[0], arr_rev_coor[1]);
                }
            }
        }

        //Hide self moves
        if(typeof this.circle != 'undefined') {
            this.circle.show().attr({cx: this.getBBox().x+this.getBBox().width-20, cy: this.getBBox().y+this.getBBox().height/2});
            this.circle_text.show().attr({x: this.getBBox().x+this.getBBox().width-20, y: this.getBBox().y+this.getBBox().height/2});
        }


        if( $('body').data('last_lighted') ) {

            $('body').data('last_lighted').highlight.remove();
            $('body').data('last_lighted').data('lighted', false);
            // clear buttons status filter
            // and hide delete button
            $("#status_dropper").hide();
        }

        if ($('body').data('last_lighted') == this && !this.data('moved')) {
            $('body').data('last_lighted', false);
        }
        else {
            var highlight = this.clone().toBack()
            this.highlight = highlight.attr({x: this.getBBox().x-2, y: this.getBBox().y-2, width: this.getBBox().width+4, height: this.getBBox().height+4,  "stroke-width": 4,  opacity: 0.2});                       
            this.data('lighted', true);
            $('body').data('last_lighted', this);
            // filter buttons assigned by status condition
            // show delete button for status in graph
            show_status_btn(this);
        }
        this.data('moved', false);

        // save status coordinates to DB
        if((typeof this.coord_id != 'undefined') && this.coord_id != 0 ) {
             jQuery.ajax({ type: 'POST',
                           url: 'lu_coordinates/save_position/'+this.coord_id.toString()+'?x='+this.getBBox().x.toString()+'&y='+this.getBBox().y.toString() });
        }
    },

    get_reverse_move_num = function (from_id, to_id) {
        if(typeof issues_moves[from_id] == 'undefined')
            return 0;
        else {
            if(typeof issues_moves[from_id][to_id] == 'undefined')
                return 0;
            else
                return issues_moves[from_id][to_id];
        }
    },


    build_connection = function (from_obj, to_obj) {
        var conn = r.connection(from_obj, to_obj, "#fff", "#fff|3");
        var attr = {font: "9pt Helvetica", opacity: 1, 'font-weight': 'bold'};
        var circle_bbox = conn.circle.getBBox();
        if(typeof issues_moves[from_obj.id][to_obj.id] == 'number') {
            var reverse_move_num = get_reverse_move_num(to_obj.id, from_obj.id)
            var text = issues_moves[from_obj.id][to_obj.id]+reverse_move_num
            if(reverse_move_num>0)
                conn.arrow_to = r.draw_arrow(r.get_arrow_rev_coordinate(conn.line)[0], r.get_arrow_rev_coordinate(conn.line)[1])
        }
        else
            var text = 0
        //add num text in circles
        conn.arrow_from = r.draw_arrow(r.get_arrow_coordinate(conn.line)[0], r.get_arrow_coordinate(conn.line)[1])

        conn.circle.attr({cursor: 'pointer'})
        conn.circle.old_status_id = from_obj.id;
        conn.circle.new_status_id = to_obj.id;
        conn.circle.click(function(){show_transition_visible_buttons(this.old_status_id,this.new_status_id)});

        conn.circle_text = r.text(circle_bbox.x+cdx, circle_bbox.y+cdy, text).attr(attr).attr({fill: "#000", cursor: 'pointer'}) //shapes[k].attr('stroke')
        conn.circle_text.old_status_id = from_obj.id;
        conn.circle_text.new_status_id = to_obj.id;
        conn.circle_text.click(function(){show_transition_visible_buttons(this.old_status_id,this.new_status_id)});

        connections.push(conn);
                
        from_obj.moves[to_obj.id] = conn
    },

    r = Raphael("lu_graph", jQuery("lu_graph").innerWidth(), jQuery("lu_graph").innerHeight());


        //r.arrow(54,104,204,304,8);

    // connections = [];
    // statuses = [];
        
    // issues_moves = [];
    // issues_buttons = [];
    // circles = [];
        

    // issues_moves[2] = [];
    // issues_moves[2][4] = 1;
    // issues_moves[2][5] = 2;

    // issues_moves[4] = [];
    // issues_moves[4][5] = 3;

    // issues_moves[6] = [];
    // issues_moves[6][12] = 9;
    // issues_moves[12] = [];
    // issues_moves[12][6] = 17;
    // issues_moves[12][5] = 2;
    // issues_moves[12][12] = 21;

    // issues_moves[5] = [];
    // issues_moves[5][12] = 9;
    // issues_moves[5][21] = 2;
    // issues_moves[5][6] = 5;

    // issues_moves[21] = [];
    // issues_moves[21][5] = 1;
    // issues_moves[21][63] = 0;

    // issues_moves[41] = [];
    // issues_moves[41][63] = 1;


    // statuses[2] = "Новая";
    // statuses[4] = "В очереди";
    // statuses[5] = "В работе";
    // statuses[12] = "Закрыта";
    // statuses[41] = "На проверке";
    // statuses[6] = "Проверена";
    // statuses[21] = "Выполнена";
    // statuses[63] = "В эксплуатации";

    // shapes = [];
    // titles = [];

  

    // rebuild_graph()

});

function show_status_btn(obj){
    var link = $("#drop_status").attr("data-link")+obj.coord_id.toString()+'?tracker_id='+$('#tracker_id').val()+'&role_id='+$('#role_id').val();
    $("#drop_status").attr("href", link );
    $("#btn_filter").attr("data-status", obj.id.toString() );

    var b_coord = $("#lu_graph").offset();
    b_coord.left += obj.getBBox().x+obj.getBBox().width-$("#status_dropper").outerWidth()+10;
    b_coord.top += obj.getBBox().y-10;
    
    $("#status_dropper").css("top",b_coord.top);
    $("#status_dropper").css("left",b_coord.left);
    $("#status_dropper").show();
}
function hide_status_btn(){
    $("#status_dropper").hide();
}

function rebuild_graph() {
    var i=0;
    for (var k in statuses) 
        if ( Object.prototype.hasOwnProperty.call(statuses, k) ) {
         // if(typeof statuses[k] != 'undefined' && statuses[k] != null) {
            var x = statuses[k].x;
            var y = statuses[k].y;


            attr = {font: "10pt Helvetica", opacity: 1};  
            titles[k] = r.text(x+10, y+20, statuses[k].name).attr(attr).attr({fill: "#fff"}).attr({'text-anchor': 'start'});
            shapes[k] = r.rect(x, y, 60, 40, 10);
            
            shapes[k].attr({width: titles[k].getBBox().width+20});
            shapes[k].title=titles[k];
            shapes[k].id=k;
            shapes[k].coord_id=statuses[k].coord_id;
            shapes[k].color = statuses[k].color;
            shapes[k].moves = [];
            // draw in-block circle        
            shapes[k].circle = r.circle(shapes[k].getBBox().x+shapes[k].getBBox().width+10, shapes[k].getBBox().y+shapes[k].getBBox().height/2, cradius).attr({fill: "#ccc", stroke: "#fff", "stroke-width": 2, cursor: 'pointer'});
            shapes[k].circle_text = r.text(shapes[k].circle.getBBox().x+cdx, shapes[k].circle.getBBox().y+cdy, issues_moves[k][k]).attr({font: "9pt Helvetica", opacity: 1, 'font-weight': 'bold', fill: "#000", cursor: 'pointer'})
            shapes[k].circle.status_id = k;
            shapes[k].circle_text.status_id = k;
            // for highlight both objects
            // shapes[k].circle.bind_to = shapes[k].circle_text;
            // shapes[k].circle_text.bind_to = shapes[k].circle;
            shapes[k].circle.click(function(){show_status_visible_buttons(this.status_id)});
            shapes[k].circle_text.click(function(){show_status_visible_buttons(this.status_id)});

            shapes[k].attr({width: shapes[k].getBBox().width+30});
            i++;
          // }
        }
    
    
    for (var k in shapes) if (Object.prototype.hasOwnProperty.call(shapes, k)) {
        var color = statuses[k].color;
        if (color == null) {
            color = Raphael.getColor();

            jQuery.ajax({ type: 'POST',
                          url: 'lu_coordinates/save_status_color/'+k.toString()+'?color='+color.toString().split('#')[1] });
        }         
        shapes[k].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
        shapes[k].drag(move, dragger, up);
        // shapes[k].mouseover(show_buttons);
        // shapes[k].mouseout(hide_buttons);
    }
    
    for (var k in issues_moves) if (Object.prototype.hasOwnProperty.call(issues_moves, k)) {
        for (var kk in issues_moves[k]) if (Object.prototype.hasOwnProperty.call(issues_moves[k], kk)) {
            if ( k != kk && (typeof shapes[kk].moves[k] == 'undefined') ) {
                build_connection(shapes[k], shapes[kk])
            }
        }
    }
}