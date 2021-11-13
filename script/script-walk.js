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
    if(px>0 && px < size+1 && py > 0 && py < size+1 && field[px][py]['id'] == undefined){
        document.getElementById('field_'+px+'-'+py).src = null;
        document.getElementById('field_'+px+'-'+py).style.cursor="pointer"; 
        document.getElementById('field_'+px+'-'+py).style.backgroundColor = "rgba(13, 2, 173, 0.7)"; //muda cor de fundo
        possible_move[count] = "field_"+px+"-"+py; 
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
        document.getElementById("field_"+selected_x+"-"+selected_y).style.cursor="auto";
        field[selected_x][selected_y] = new Array();  
        field[selected_x][selected_y]['character'] = false;

        side(x,y,selected_field.pclass, selected_field.sex)

        var elem = document.createElement("img");
        elem.setAttribute("src", selected_field['sprite']);
        elem.setAttribute("height", character['height']);
        elem.setAttribute("width", character['width']);
        document.getElementById("field_"+x+"-"+y).appendChild(elem); //Insere na area selecionada
        document.getElementById("field_"+x+"-"+y).style.cursor="pointer";
        
        document.getElementById('field_'+selected_x+"-"+selected_y).style.backgroundColor = "";  //Remove fundo amarelo
        field[x][y] = selected_field;
        turn[0].walk = false;
    }

    return is_walk;
}

function RedoMoveRange(){
    var i;

    for(i=0;i<possible_move.length;i++){
        document.getElementById(possible_move[i]).style.backgroundColor = "";
        document.getElementById(possible_move[i]).style.opacity = "1"; 
        
        if(possible_move[i] != 'field_'+selected_x+"-"+selected_y){      
            document.getElementById(possible_move[i]).style.cursor="auto";
        }
    }	

    count = 0;
    possible_move = new Array;
}

function side(x,y,pclass,sex){
    if(selected_y < y){
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_2.png";
        return;
    }
    if(selected_y > y){
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_4.png";
        return;
    }
    if(selected_x > x){
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_3.png";
        return;
    }
    if(selected_x < x){
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_1.png";
        return;
    }
}
