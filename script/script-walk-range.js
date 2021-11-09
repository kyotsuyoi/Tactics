var count = 0;
var possible_move = new Array;

function StepRange(){
    var step = selected_field['step'];
    //alert(step);
    if(step==1){
        PossibleMove(selected_x-1,selected_y);
        PossibleMove(selected_x,selected_y-1);
        PossibleMove(selected_x+1,selected_y);
        PossibleMove(selected_x,selected_y+1);
    }

    if(step==2){
        PossibleMove(selected_x-1,selected_y);    PossibleMove(selected_x-2,selected_y);
        PossibleMove(selected_x,selected_y-1);    PossibleMove(selected_x,selected_y-2);
        PossibleMove(selected_x-1,selected_y-1);  
        PossibleMove(selected_x+1,selected_y);    PossibleMove(selected_x+2,selected_y);
        PossibleMove(selected_x,selected_y+1);    PossibleMove(selected_x,selected_y+2);
        PossibleMove(selected_x+1,selected_y+1);  
        PossibleMove(selected_x-1,selected_y+1);  
        PossibleMove(selected_x+1,selected_y-1); 
    }
}

function PossibleMove(px,py){
    if(px>0 && px < size+1 && py > 0 && py < size+1 && field[px][py]['name'] == undefined){// && 
        document.getElementById('field_'+(px)+'-'+(py)).src = null;
        document.getElementById('field_'+(px)+'-'+(py)).style.backgroundColor = "rgba(13, 2, 173, 0.7)"; //muda cor de fundo
        possible_move[count] = "field_"+(px)+"-"+(py); 
        count++;
    }
}

function WalkTo(x,y){
    var i;
    var is_walk = false;
    for(i=0;i<=possible_move.length;i++){ 
        if(possible_move[i]=="field_"+x+"-"+y){
            is_walk=true;
            i=possible_move.length;
        }
    }

    if(is_walk){
        document.getElementById("field_"+selected_x+"-"+selected_y).innerHTML = ""; //Remove personagem da area anterior
        field[selected_x][selected_y] = new Array();  

        side(x,y,selected_field['name'])

        var elem = document.createElement("img");
        elem.setAttribute("src", selected_field['sprite']);
        elem.setAttribute("height", "65");
        elem.setAttribute("width", "65");
        document.getElementById("field_"+x+"-"+y).appendChild(elem);

        field[x][y] = selected_field;
    }

    return is_walk;
}

function RedoMoveRange(){
    var cf;
    document.getElementById('field_'+selected_x+"-"+selected_y).style.backgroundColor = "";  

    for(cf=0;cf<possible_move.length;cf++){
        document.getElementById(possible_move[cf]).style.backgroundColor = "";
        document.getElementById(possible_move[cf]).style.opacity = "1";
    }	

    count = 0;
    possible_move = new Array;
}

function side(x,y,name){
    if(selected_y < y){
        selected_field['sprite'] = "src/"+name+"_2.png";
        return;
    }
    if(selected_y > y){
        selected_field['sprite'] = "src/"+name+"_4.png";
        return;
    }
    if(selected_x > x){
        selected_field['sprite'] = "src/"+name+"_3.png";
        return;
    }
    if(selected_x < x){
        selected_field['sprite'] = "src/"+name+"_1.png";
        return;
    }
}
