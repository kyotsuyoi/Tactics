var selected_field = undefined;
var selected_x = 0;
var selected_y = 0;

var size = 8;

document.getElementById('block').style.display='none';
document.getElementById('action-select').style.display='none';

NewField(size); //script-field.js

function Selected(x,y){
    
    if(selected_field == field[x][y]){

        if(selected_field['name'] != undefined){              
            document.getElementById('field_'+x+"-"+y).style.backgroundColor = "rgba(240, 236, 7, 0.7)";  
            document.getElementById('action-select').style.display='inline';
            document.getElementById('block').style.display='inline';

            document.getElementById("selected_char_img").src = "src/"+selected_field['name']+"_1.png";
            document.getElementById("selected_char_hp").textContent = "HP:" + selected_field['hp'] + "/" + selected_field['maxhp'];
            document.getElementById("selected_char_sp").textContent = "SP:" + selected_field['sp'] + "/" + selected_field['maxsp'];
            document.getElementById("selected_char_atk").textContent = "ATK:" + selected_field['atk'];
            document.getElementById("selected_char_def").textContent = "DEF:" + selected_field['def'];
            document.getElementById("selected_char_matk").textContent = "ATK:" + selected_field['matk'];
            document.getElementById("selected_char_mdef").textContent = "DEF:" + selected_field['mdef'];
            document.getElementById("selected_char_step").textContent = "STEP:" + selected_field['step'];
            document.getElementById("selected_char_range").textContent = "RANGE:" + selected_field['range'];
            document.getElementById("selected_char_mrange").textContent = "MRANGE:" + selected_field['mrange'];
        }
        return;
    }

    if(action == "walk"){
        if(!WalkTo(x,y)) return;
        action=undefined;
        RedoMoveRange(); //script-step-range
        selected_x = x;
        selected_y = y;
        return;
    }

    if(action == "attack" || action == "magic"){
        if(!AttackTo(x,y)) return;
        action=undefined;
        RedoAttackRange(); //script-step-range
        return;
    }

    if(selected_field != undefined){ 
        RedoMoveRange();//script-step-range
        RedoAttackRange();//script-step-range
    }
    selected_field=field[x][y];
    selected_x = x;
    selected_y = y;

    if(selected_field['name'] != undefined){    
        document.getElementById('field_'+x+"-"+y).style.backgroundColor = "rgba(240, 236, 7, 0.7)";          
        document.getElementById('action-select').style.display='inline';
        document.getElementById('block').style.display='inline';

        document.getElementById("selected_char_img").src = "src/"+selected_field['name']+"_1.png";
        document.getElementById("selected_char_hp").textContent = "HP:" + selected_field['hp'] + "/" + selected_field['maxhp'];
        document.getElementById("selected_char_sp").textContent = "SP:" + selected_field['sp'] + "/" + selected_field['maxsp'];
        document.getElementById("selected_char_atk").textContent = "ATK:" + selected_field['atk'];
        document.getElementById("selected_char_def").textContent = "DEF:" + selected_field['def'];
        document.getElementById("selected_char_matk").textContent = "ATK:" + selected_field['matk'];
        document.getElementById("selected_char_mdef").textContent = "DEF:" + selected_field['mdef'];
        document.getElementById("selected_char_step").textContent = "STEP:" + selected_field['step'];
        document.getElementById("selected_char_range").textContent = "RANGE:" + selected_field['range'];
        document.getElementById("selected_char_mrange").textContent = "MRANGE:" + selected_field['mrange'];
    }
}

var action = undefined;

function Action(v_action){
    if(v_action=="return"){
        document.getElementById('block').style.display='none';
        document.getElementById('action-select').style.display='none';
        
        action=undefined;
        RedoMoveRange();//script-step-range
        RedoAttackRange();//script-step-range
    }

    if(v_action=="walk"){
        document.getElementById('block').style.display='none';
        document.getElementById('action-select').style.display='none';

        if(action==undefined){
            action = v_action;
            StepRange();
        }
    }

    if(v_action=="attack"){
        document.getElementById('block').style.display='none';
        document.getElementById('action-select').style.display='none';

        if(action==undefined){
            action = v_action;
            AttackRange(1);
        }
    }

    if(v_action=="magic"){
        document.getElementById('block').style.display='none';
        document.getElementById('action-select').style.display='none';

        if(action==undefined){
            action = v_action;
            AttackRange(2);
        }
    }
}