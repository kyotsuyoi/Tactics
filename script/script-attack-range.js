var count = 0;
var possible_attack = new Array;  
var attack_range;
var attack_type = 0;

function AttackRange(atk_type){  
    attack_type = atk_type;
    switch (attack_type){
        case 1:
            attack_range = selected_field['range'];
            break;
        case 2:
            attack_range = selected_field['mrange'];
            break;
    }
    //alert(step);
    if(attack_range==1){
        PossibleAttack(selected_x-1,selected_y);
        PossibleAttack(selected_x,selected_y-1);
        PossibleAttack(selected_x+1,selected_y);
        PossibleAttack(selected_x,selected_y+1);
    }

    if(attack_range==2){
        PossibleAttack(selected_x-1,selected_y);    PossibleAttack(selected_x-2,selected_y);
        PossibleAttack(selected_x,selected_y-1);    PossibleAttack(selected_x,selected_y-2);
        PossibleAttack(selected_x-1,selected_y-1);  
        PossibleAttack(selected_x+1,selected_y);    PossibleAttack(selected_x+2,selected_y);
        PossibleAttack(selected_x,selected_y+1);    PossibleAttack(selected_x,selected_y+2);
        PossibleAttack(selected_x+1,selected_y+1);  
        PossibleAttack(selected_x-1,selected_y+1);  
        PossibleAttack(selected_x+1,selected_y-1); 
    }
}

function PossibleAttack(px,py){
    if(px>0 && px < size+1 && py > 0 && py < size+1){// && 
        document.getElementById('field_'+(px)+'-'+(py)).src = null;
        document.getElementById('field_'+(px)+'-'+(py)).style.backgroundColor = "rgba(242, 12, 12, 0.7)"; //muda cor de fundo
        possible_attack[count] = "field_"+(px)+"-"+(py); 
        count++;
    }
}

function AttackTo(x,y){
    var i;
    var is_attack = false;
    for(i=0;i<=possible_attack.length;i++){ 
        if(possible_attack[i]=="field_"+x+"-"+y){
            is_attack=true;
            i=possible_attack.length;
        }
    }

    if(is_attack){
        if(field[x][y]['name'] == undefined){            
            return false;
        }

        var hp = field[x][y]['hp'];  
        var atk;
        var def;
        var r_atk;

        if(attack_type==1){
            atk = selected_field['atk'];
            def = field[x][y]['def'];
        }else{
            atk = selected_field['matk'];
            def = field[x][y]['mdef'];
            selected_field['sp'] = selected_field['sp'] - 10;
        }

       
        if(def > atk){
            round = Math.round(Math.random() * ((atk/2) - 1) + 1);
            r_atk = round; 
        }else{     
            round = Math.round(Math.random() * ((atk/2) - 0) + 0);          
            r_atk = atk - def + (round);          
        }
        field[x][y]['hp'] = hp - r_atk;

        var side = Side(x,y,selected_field['name']);

        var text = document.createElement("p");
        text.textContent = r_atk;        
        text.setAttribute("id", "damage");
        document.getElementById("field_"+x+"-"+y).appendChild(text);

        setTimeout(function () {
            document.getElementById("field_"+x+"-"+y).removeChild(text);       
        }, 1000);        

        document.getElementById("field_"+selected_x+"-"+selected_y).innerHTML = "";

        switch (side){
            case 4:  
                var img_attack = document.createElement("img");
                img_attack.setAttribute("src", "src/sword_01.png");
                img_attack.setAttribute("style", "margin-left: -25px; margin-bottom: 18px;");
                document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(img_attack);

                var img = document.createElement("img");
                img.setAttribute("src", selected_field['sprite']);
                img.setAttribute("height", "65");
                img.setAttribute("width", "65");
                document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(img);  
                break;
            case 2:
                var img = document.createElement("img");
                img.setAttribute("src", selected_field['sprite']);
                img.setAttribute("height", "65");
                img.setAttribute("width", "65");
                document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(img);        

                var img_attack = document.createElement("img");
                img_attack.setAttribute("id", "sword");
                img_attack.setAttribute("src", "src/sword_01.png");
                img_attack.setAttribute("style", "margin-left: 0px; margin-bottom: 18px;");
                document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(img_attack);

                document.getElementById("sword").style.transform = "rotate(90deg)";
                break;
            default:
                var img = document.createElement("img");
                img.setAttribute("src", selected_field['sprite']);
                img.setAttribute("height", "65");
                img.setAttribute("width", "65");
                document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(img);  
        }

        setTimeout(function () {
            document.getElementById("field_"+selected_x+"-"+selected_y).removeChild(img_attack);       
        }, 500);

        attack_type = 0;
    }

    return is_attack;
}

function RedoAttackRange(){
    var cf;
    document.getElementById('field_'+selected_x+"-"+selected_y).style.backgroundColor = "";  

    for(cf=0;cf<possible_attack.length;cf++){
        document.getElementById(possible_attack[cf]).style.backgroundColor = "";
        document.getElementById(possible_attack[cf]).style.opacity = "1";
    }	

    count = 0;
    possible_attack = new Array;
}

function Side(x,y,name){
    if(selected_y < y){
        selected_field['sprite'] = "src/"+name+"_2.png";
        return 2;
    }
    if(selected_y > y){
        selected_field['sprite'] = "src/"+name+"_4.png";
        return 4;
    }
    if(selected_x > x){
        selected_field['sprite'] = "src/"+name+"_3.png";
        return 3;
    }
    if(selected_x < x){
        selected_field['sprite'] = "src/"+name+"_1.png";
        return 1;
    }
}
