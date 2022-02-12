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

function PossibleMove(x,y){
    count = 0
    if(x>0 && x < size+1 && y > 0 && y < size+1 && field[x][y]['id'] == undefined){
        document.getElementById('field_'+x+'-'+y).src = null;
        document.getElementById('field_'+x+'-'+y).style.cursor="pointer"; 
        document.getElementById('field_'+x+'-'+y).style.backgroundColor = "rgba(13, 2, 173, 0.7)"; //muda cor de fundo
        //possible_move[count] = "field_"+x+"-"+y; 
        field_pos = new Array
        field_pos['x'] = x
        field_pos['y'] = y

        possible_move.push(field_pos)
        count++;
    }
}

function WalkTo(x,y){
    // field_pos = new Array
    // field_pos['x'] = x
    // field_pos['y'] = y
    // is_walk = possible_move.some(elemen => JSON.stringify(elemen) === JSON.stringify(field_pos));

    var i;
    var is_walk = false;
    for(i=0;i<=possible_move.length;i++){ 
        if(possible_move[i].x == x && possible_move[i].y == y){
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
        field_string = "field_"+possible_move[i].x+"-"+possible_move[i].y 
        document.getElementById(field_string).style.backgroundColor = "";
        document.getElementById(field_string).style.opacity = "1"; 
        
        if(field_string != 'field_'+selected_x+"-"+selected_y){      
            document.getElementById(field_string).style.cursor="auto";
        }
    }	

    //count = 0;
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
