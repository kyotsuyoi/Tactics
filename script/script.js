var selected_field = undefined;
var selected_x = 0;
var selected_y = 0;

var size = 15;

document.getElementById('block').style.display='none';
document.getElementById('action-select').style.display='none';

NewField(size); //script-field.js

function Selected(x,y){
    
    if(selected_field == field[x][y]){

        if(selected_field['id'] != undefined){    
            document.getElementById('field_'+x+"-"+y).style.backgroundColor = "rgba(240, 236, 7, 0.7)";            
            ShowCharacterCard();
        }
        return;
    }

    if(action == "walk"){
        if (turn[0].id != selected_field.id || turn[0].walk == false) return;
        if(!WalkTo(x,y)) return;
        action=undefined;
        selected_x = x;
        selected_y = y;
        RedoMoveRange(); //script-step
        //ShowCharacterCard();
        return;
    }

    if(action == "attack" || action == "magic" || action == "arrow"){
        if (turn[0].id != selected_field.id || turn[0].attack == false) return;
        if(!AttackTo(x,y)) return;
        action=undefined;
        RedoAttackRange(); //script-step
        //ShowCharacterCard();
        return;
    }

    if(selected_field != undefined){ 
        RedoMoveRange();//script-step
        RedoAttackRange();//script-step
    }
    selected_field=field[x][y];
    selected_x = x;
    selected_y = y;

    if(selected_field['id'] != undefined){  
        document.getElementById('field_'+x+"-"+y).style.backgroundColor = "rgba(240, 236, 7, 0.7)";    
        ShowCharacterCard();
    }
}

var action = undefined;

function Action(v_action){
    
    document.getElementById('block').style.display='none';
    document.getElementById('action-select').style.display='none';

    if(action != v_action && action != undefined){
        action = undefined;
        RedoMoveRange();//script-step
        RedoAttackRange();//script-step
        document.getElementById('field_'+selected_x+"-"+selected_y).style.backgroundColor = "rgba(240, 236, 7, 0.7)"; 
    }

    if(action == undefined){         
        action = v_action;      
    
        if(v_action=="walk"){
            StepRange();
        }
    
        if(v_action=="attack"){
            AttackRange(1);
        }

        if(v_action=="arrow"){
            AttackRange(3);
        }
    
        if(v_action=="magic"){
            AttackRange(2);
        }
    }

    if(v_action=="return"){  
        RedoMoveRange();//script-step
        RedoAttackRange();//script-step                  
        action=undefined;
    } 
    
    if(v_action=="end"){  
        if (turn[0].id != selected_field.id) return;
        RedoMoveRange();//script-step
        RedoAttackRange();//script-step                  
        action=undefined;

        turn[0].walk = true;
        turn[0].attack = true;

        // temp = turn[0];
        // for(i=0;i<=turn.length-1;i++){  
        //     turn[i] = turn[i+1];
        // }
        // turn[turn.length-1] = temp;

        EndTurn();
        SetTurnBatch();
    }  
}

function ShowCharacterCard(){
    document.getElementById('action-select').style.display='inline';
    document.getElementById('block').style.display='inline';

    document.getElementById("selected_char_img").src = "src/character/"+selected_field.pclass+"_"+selected_field.sex+"_1.png";
    document.getElementById("selected_char_class").textContent = "Classe:" + selected_field['pclass'];
    document.getElementById("selected_char_hp").textContent = "HP:" + selected_field['hp'] + "/" + selected_field['maxhp'];
    document.getElementById("selected_char_sp").textContent = "SP:" + selected_field['sp'] + "/" + selected_field['maxsp'];

    document.getElementById("selected_char_atk").textContent = "ATK:" + selected_field['atk'];
    document.getElementById("selected_char_def").textContent = "DEF:" + selected_field['def'];
    document.getElementById("selected_char_matk").textContent = "MATK:" + selected_field['matk'];
    document.getElementById("selected_char_mdef").textContent = "MDEF:" + selected_field['mdef'];
    document.getElementById("selected_char_dex").textContent = "DEX:" + selected_field['dex'];
    document.getElementById("selected_char_agi").textContent = "AGI:" + selected_field['agi'];

    document.getElementById("selected_char_step").textContent = "STEP:" + selected_field['step'];
    document.getElementById("selected_char_range").textContent = "RANGE:" + selected_field['range'];
    document.getElementById("selected_char_mrange").textContent = "MRANGE:" + selected_field['mrange'];
    document.getElementById("selected_char_arange").textContent = "ARANGE:" + selected_field['arange'];
    document.getElementById("selected_char_arrow").textContent = "ARROW:" + selected_field['arrow'];

    if(selected_field['hp'] <= 0){  
        document.getElementById("action-select-attack").style.display = "none"; 
        document.getElementById("action-select-arrow").style.display = "none"; 
        document.getElementById("action-select-magic").style.display = "none"; 
        document.getElementById("action-select-walk").style.display = "none"; 
    }else{
        document.getElementById("action-select-attack").style.display = "inline"; 
        document.getElementById("action-select-arrow").style.display = "inline"; 
        document.getElementById("action-select-magic").style.display = "inline"; 
        document.getElementById("action-select-walk").style.display = "inline"; 
    }
}