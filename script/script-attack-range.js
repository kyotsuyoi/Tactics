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
        case 3:
            attack_range = 3;
            break;
    }
    
    if(attack_range==1){
        PossibleAttack(selected_x-1,selected_y);
        PossibleAttack(selected_x,selected_y-1);
        PossibleAttack(selected_x+1,selected_y);
        PossibleAttack(selected_x,selected_y+1);
    }

    if(attack_range==2){
        PossibleAttack(selected_x-1,selected_y);    PossibleAttack(selected_x-2,selected_y);
        PossibleAttack(selected_x,selected_y-1);    PossibleAttack(selected_x,selected_y-2);
        PossibleAttack(selected_x+1,selected_y);    PossibleAttack(selected_x+2,selected_y);
        PossibleAttack(selected_x,selected_y+1);    PossibleAttack(selected_x,selected_y+2);
        
        PossibleAttack(selected_x-1,selected_y-1);  
        PossibleAttack(selected_x+1,selected_y+1);  
        PossibleAttack(selected_x-1,selected_y+1);  
        PossibleAttack(selected_x+1,selected_y-1); 
    }

    if(attack_range==3){
        PossibleAttack(selected_x-2,selected_y);    PossibleAttack(selected_x-3,selected_y);
        PossibleAttack(selected_x,selected_y-2);    PossibleAttack(selected_x,selected_y-3);
        
        PossibleAttack(selected_x+2,selected_y);    PossibleAttack(selected_x+3,selected_y);
        PossibleAttack(selected_x,selected_y+2);    PossibleAttack(selected_x,selected_y+3);

        PossibleAttack(selected_x-2,selected_y-1);  PossibleAttack(selected_x-1,selected_y-1);  PossibleAttack(selected_x-1,selected_y-2);
        PossibleAttack(selected_x+2,selected_y+1);  PossibleAttack(selected_x+1,selected_y+1);  PossibleAttack(selected_x+1,selected_y+2);        
        
        PossibleAttack(selected_x-2,selected_y+1);  PossibleAttack(selected_x-1,selected_y+1);  PossibleAttack(selected_x-1,selected_y+2);
        PossibleAttack(selected_x+2,selected_y-1);  PossibleAttack(selected_x+1,selected_y-1);  PossibleAttack(selected_x+1,selected_y-2);        
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

        var dex = selected_field['dex'];        
        var agi = field[x][y]['agi'];
        var percent =  Math.round(Math.random() * ((100) - 0) + 0);
        var hit = (dex*100/agi)/2;

        if(percent > hit){
            var text = document.createElement("p");
            text.textContent = "E";        
            text.setAttribute("id", "damage");
            document.getElementById("field_"+x+"-"+y).appendChild(text);

            setTimeout(function () {
                document.getElementById("field_"+x+"-"+y).removeChild(text);       
            }, 1000); 
            return true;
        }

        switch (attack_type){
            case 1:
                atk = selected_field['atk'];
                def = field[x][y]['def'];
                break;
            case 2:
                atk = selected_field['matk'];
                def = field[x][y]['mdef'];
                if(selected_field['sp'] - 15 < 0){
                    var text = document.createElement("p");
                    text.textContent = "SP";        
                    text.setAttribute("id", "damage");
                    document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(text);

                    setTimeout(function () {
                        document.getElementById("field_"+selected_x+"-"+selected_y).removeChild(text);       
                    }, 1000);
                    return false;
                }
                selected_field['sp'] = selected_field['sp'] - 15;
                break;
            case 3:
                atk = selected_field['atk'];
                if(selected_field.pclass == "archer"){
                    atk = atk+selected_field['dex'];
                }
                def = field[x][y]['def'];

                if(selected_field['arrow'] - 1 < 0){
                    var text = document.createElement("p");
                    text.textContent = "X";        
                    text.setAttribute("id", "damage");
                    document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(text);

                    setTimeout(function () {
                        document.getElementById("field_"+selected_x+"-"+selected_y).removeChild(text);       
                    }, 1000);
                    return false;
                }
                selected_field['arrow'] = selected_field['arrow'] - 1;
                break;
            default:
                return false;
        }
       
        if(def > atk){
            //round = Math.round(Math.random() * ((atk/2) - 1) + 1);
            r_atk = 1; 
        }else{     
            round = Math.round(Math.random() * ((atk/2) - 1) + 1);          
            r_atk = atk - def + (round);          
        }

        if((hp - r_atk) <= 0){
            field[x][y]['hp'] = 0;
            
            document.getElementById("field_"+x+"-"+y).innerHTML="";
            var img = document.createElement("img");
            img.setAttribute("src", "src/"+ field[x][y]['name'] +"_3.png");
            document.getElementById("field_"+x+"-"+y).appendChild(img);

            var rdn = Math.round(Math.random() * (2 - 1) + 1);
            if(rdn == 1){                
                img.setAttribute("style", "transform:rotate(-90deg)");
            }else{                
                img.setAttribute("style", "transform:rotate(90deg)");
            }

            var temp_turn = new Array();
            var pos = 0;
            for(i=0;i<=turn.length-1;i++){
                if(field[x][y].name != turn[i].name){
                    temp_turn[pos] = turn[i];
                    pos++;
                }
            }

            turn = temp_turn;
            SetTurnBatch();

        }else{
            field[x][y]['hp'] = hp - r_atk;
        }

        var side = Side(x,y,selected_field['name']);
        AttackAnim(side);

        DamageAnim(r_atk,x,y);

        attack_type = 0;
        turn[0].attack = false;
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
    if(selected_y < y){ //Direita
        selected_field['sprite'] = "src/"+name+"_2.png";
        return 2;
    }
    if(selected_y > y){ //Esquerda
        selected_field['sprite'] = "src/"+name+"_4.png";
        return 4; 
    }
    if(selected_x > x){ //Cima
        selected_field['sprite'] = "src/"+name+"_3.png";
        return 3;
    }
    if(selected_x < x){ //Baixo
        selected_field['sprite'] = "src/"+name+"_1.png";
        return 1;
    }
}

function AttackAnim(side){
    document.getElementById("field_"+selected_x+"-"+selected_y).innerHTML = "";
    
    var weapon = document.createElement("img");        
    var sprite = document.createElement("img");
    sprite.setAttribute("src", selected_field['sprite']);
    sprite.setAttribute("height", selected_field['height']);
    sprite.setAttribute("width", selected_field['width']); 

    switch (side){       
        
        case 2: //Direita
            weapon.setAttribute("id", "weapon");    
            weapon.setAttribute("class", "weapon_right");
            weapon.setAttribute("left", "-24");
            weapon.setAttribute("src", "src/sword_01.png");
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(weapon);

            document.getElementById("weapon").style.transform = "rotate(90deg)";

            setTimeout(function () {                
                document.getElementById("weapon").style.top = "10px";  
                document.getElementById("weapon").style.transform = "rotate(135deg)";  
            }, 200);
             
            sprite.setAttribute("class", "character_right");
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(sprite);    
            break;

        case 4: //Esquerda
            weapon.setAttribute("id", "weapon");       
            weapon.setAttribute("class", "weapon_left");
            weapon.setAttribute("src", "src/sword_01.png");  
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(weapon);

            setTimeout(function () {                
                document.getElementById("weapon").style.top = "10px";  
                document.getElementById("weapon").style.transform = "rotate(-45deg)";  
            }, 200);

            sprite.setAttribute("class", "character_left");
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(sprite);  
            break;

        case 3:
            weapon.setAttribute("id", "weapon");       
            weapon.setAttribute("class", "weapon_up");
            weapon.setAttribute("src", "src/sword_01.png");  
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(weapon);

            setTimeout(function () {                
                document.getElementById("weapon").style.top = "-30px";  
                document.getElementById("weapon").style.left = "10px"; 
                document.getElementById("weapon").style.transform = "rotate(45deg)";  
            }, 200);

            sprite.setAttribute("class", "character_up");
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(sprite); 
            break;

        case 1:
            weapon.setAttribute("id", "weapon");       
            weapon.setAttribute("class", "weapon_down");
            weapon.setAttribute("src", "src/sword_01.png");  
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(weapon);

            setTimeout(function () {                
                document.getElementById("weapon").style.top = "34px";  
                document.getElementById("weapon").style.transform = "rotate(-135deg)";  
                document.getElementById("weapon").style.zIndex = "2"; 
            }, 200);

            sprite.setAttribute("class", "character_down");
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(sprite); 
            break;
    }

    setTimeout(function () {
        document.getElementById("field_"+selected_x+"-"+selected_y).removeChild(weapon);   
        sprite.setAttribute("class", "character_center");   
    }, 400);
}

function DamageAnim(r_atk,x,y){
    var text = document.createElement("p");
    text.textContent = r_atk;        
    text.setAttribute("id", "damage");
    document.getElementById("field_"+x+"-"+y).appendChild(text);     
    document.getElementById("sword").style.zIndex = "10"; 

    setTimeout(function () {
        document.getElementById("field_"+x+"-"+y).removeChild(text);       
    }, 1000); 
}
