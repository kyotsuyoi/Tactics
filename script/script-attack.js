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
        
        if(selected_field.pclass=="archer"){
            PossibleAttack(selected_x+4,selected_y);   
            PossibleAttack(selected_x,selected_y+4); 
            PossibleAttack(selected_x-4,selected_y);  
            PossibleAttack(selected_x,selected_y-4);   

            PossibleAttack(selected_x-1,selected_y+3);             
            PossibleAttack(selected_x-2,selected_y+2);             
            PossibleAttack(selected_x-3,selected_y+1); 

            PossibleAttack(selected_x+1,selected_y-3);             
            PossibleAttack(selected_x+2,selected_y-2);             
            PossibleAttack(selected_x+3,selected_y-1); 

            PossibleAttack(selected_x+1,selected_y+3);             
            PossibleAttack(selected_x+2,selected_y+2);             
            PossibleAttack(selected_x+3,selected_y+1); 

            PossibleAttack(selected_x-1,selected_y-3);             
            PossibleAttack(selected_x-2,selected_y-2);             
            PossibleAttack(selected_x-3,selected_y-1); 
        }
    }
}

function PossibleAttack(px,py){
    if(px>0 && px < size+1 && py > 0 && py < size+1){
        document.getElementById('field_'+(px)+'-'+(py)).src = null;
        document.getElementById('field_'+px+'-'+py).style.cursor="pointer"; 
        if(selected_field.pclass=="healer" && attack_type==2){
            document.getElementById('field_'+(px)+'-'+(py)).style.backgroundColor = "rgba(12, 242, 12, 0.7)"; //muda cor de fundo para verde
        }else{
            document.getElementById('field_'+(px)+'-'+(py)).style.backgroundColor = "rgba(242, 12, 12, 0.7)"; //muda cor de fundo para vermelho
        }
        // possible_attack[count] = "field_"+(px)+"-"+(py); 
        possible_attack[count] = new Array; 
        possible_attack[count]['x'] = px; 
        possible_attack[count]['y'] = py; 
        count++;
    }
}

function AttackTo(x,y){
    var i;
    var is_attack = false;
    for(i=0;i<=possible_attack.length;i++){ 
        if("field_"+possible_attack[i].x+"-"+possible_attack[i].y == "field_"+x+"-"+y){
            is_attack=true;
            i=possible_attack.length;
        }
    }

    if(is_attack){
        if(field[x][y]['id'] == undefined){            
            return false;
        }

        var hp = field[x][y]['hp'];  
        var atk;
        var def;
        var r_atk;
        
        var side = Side(x,y,selected_field.pclass,selected_field.sex);
        AttackAnim(side);
        
        switch (attack_type){
            case 1:                
                if(Flee(x,y)) return;
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
                if(Flee(x,y)) return;
                break;
                
            default:
                return false;
        }  

        var round = Math.round(Math.random() * ((atk/2) - 1) + 1);

        if(selected_field.pclass=="healer"&& attack_type==2){
            r_atk = atk/2 + round;

            if(hp <= 0){
                AddToBatch(field[x][y].id,
                    field[x][y].agi,
                    field[x][y].pclass,
                    field[x][y].p_id,
                    field[x][y].sex
                );
                SetTurnBatch();
            }

            if((hp + r_atk) >= field[x][y]['maxhp']){
                field[x][y]['hp'] = field[x][y]['maxhp'];
            }else{
                field[x][y]['hp'] = hp + r_atk;
            }

        }else if(selected_field.pclass=="necro" && attack_type==2){
            r_atk = atk/2 + round;

            if(hp <= 0){
                AddToBatch(
                    field[x][y].id,
                    field[x][y].agi,
                    field[x][y].pclass,
                    selected_field.p_id,
                    field[x][y].sex
                );
                SetTurnBatch();

                if((hp + r_atk) >= field[x][y]['maxhp']){
                    field[x][y]['hp'] = field[x][y]['maxhp'];
                }else{
                    field[x][y]['hp'] = hp + r_atk;
                }
            }else{
                r_atk = "E";
            }            

        }else{
            r_atk = atk + round - def;  
            if(def > atk){
                round = Math.round(Math.random() * ((atk/2) - 1) + 1);
                r_atk = round; 
            }

            if((hp - r_atk) <= 0){
                field[x][y]['hp'] = 0;
                
                DeadAnim(x,y);

                RemoveFromBatch(field[x][y].id,field[x][y].p_id);                
                SetTurnBatch();

            }else{
                field[x][y]['hp'] = hp - r_atk;
            }
        }        

        DamageAnim(r_atk,x,y);

        attack_type = 0;
        turn[0].attack = false;
        
        document.getElementById("field_"+selected_x+"-"+selected_y).style.cursor="pointer";
    }

    return is_attack;
}

function RedoAttackRange(){
    var i;

    document.getElementById('field_'+selected_x+"-"+selected_y).style.backgroundColor = "";  
    for(i=0;i<possible_attack.length;i++){
        document.getElementById('field_'+possible_attack[i].x+"-"+possible_attack[i].y).style.backgroundColor = "";
        document.getElementById('field_'+possible_attack[i].x+"-"+possible_attack[i].y).style.opacity = "1";

        x=possible_attack[i].x; y=possible_attack[i].y;
        if(field[x][y]['character'] == false){      
            document.getElementById('field_'+possible_attack[i].x+"-"+possible_attack[i].y).style.cursor="auto";
        }
    }	

    count = 0;
    possible_attack = new Array;
}

function Side(x,y,pclass,sex){
    if(selected_y < y){ //Direita
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_2.png";
        return 2;
    }
    if(selected_y > y){ //Esquerda
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_4.png";
        return 4; 
    }
    if(selected_x > x){ //Cima
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_3.png";
        return 3;
    }
    if(selected_x < x){ //Baixo
        selected_field['sprite'] = src_path+"character/"+pclass+"_"+sex+"_1.png";
        return 1;
    }
}

function AttackAnim(side){
    document.getElementById("field_"+selected_x+"-"+selected_y).innerHTML = "";
    
    var weapon = document.createElement("img");      
    weapon.setAttribute("id", "weapon");     

    var sprite = document.createElement("img");
    sprite.setAttribute("src", selected_field['sprite']);
    sprite.setAttribute("height", selected_field['height']);
    sprite.setAttribute("width", selected_field['width']); 

    var weapon_sprite;
    switch (attack_type){
        case 1:
            weapon_sprite = "sword_01";
            break;
        case 2:
            weapon_sprite = "rod_01";
            break;
        case 3:
            weapon_sprite = "arrow_01";
            break;
    }

    switch (side){       
        
        case 2: //Direita 
            weapon.setAttribute("class", "weapon_right");
            weapon.setAttribute("left", "-24");
            weapon.setAttribute("src", src_path+"weapon/"+weapon_sprite+".png");
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
            weapon.setAttribute("class", "weapon_left");
            weapon.setAttribute("src", src_path+"weapon/"+weapon_sprite+".png");  
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(weapon);

            setTimeout(function () {                
                document.getElementById("weapon").style.top = "10px";  
                document.getElementById("weapon").style.transform = "rotate(-45deg)";  
            }, 200);

            sprite.setAttribute("class", "character_left");
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(sprite);  
            break;

        case 3:     
            weapon.setAttribute("class", "weapon_up");
            weapon.setAttribute("src", src_path+"weapon/"+weapon_sprite+".png");  
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
            weapon.setAttribute("class", "weapon_down");
            weapon.setAttribute("src", src_path+"weapon/"+weapon_sprite+".png");  
            document.getElementById("field_"+selected_x+"-"+selected_y).appendChild(weapon);
            
            document.getElementById("weapon").style.transform = "rotate(-90deg)";  

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

function DeadAnim(x,y){
    document.getElementById("field_"+x+"-"+y).innerHTML="";
    var img = document.createElement("img");
    img.setAttribute("src", src_path+"character/"+ field[x][y].pclass+"_"+field[x][y].sex +"_3.png");
    document.getElementById("field_"+x+"-"+y).appendChild(img);

    var rdn = Math.round(Math.random() * (2 - 1) + 1);
    if(rdn == 1){                
        img.setAttribute("style", "transform:rotate(-90deg)");
    }else{                
        img.setAttribute("style", "transform:rotate(90deg)");
    }
}

function DamageAnim(r_atk,x,y){
    var text = document.createElement("p");
    text.textContent = r_atk;        
    text.setAttribute("id", "damage"); 
    if(selected_field.pclass=="healer" && attack_type==2){
        text.setAttribute("style", "color:greenyellow");
    }
    if(selected_field.pclass=="necro" && attack_type==2){
        text.setAttribute("style", "color:darkviolet");
    }
    document.getElementById("field_"+x+"-"+y).appendChild(text);     
    document.getElementById("weapon").style.zIndex = "10"; 

    setTimeout(function () {   
        text.setAttribute("style", "color:red");      
        document.getElementById("field_"+x+"-"+y).removeChild(text);     
    }, 1000); 
}

function Flee(x, y){
    if(selected_field.pclass=="healer"){
        return false;
    }
    var dex = selected_field['dex'];        
    var agi = field[x][y]['agi'];
    var percent = Math.round(Math.random() * ((100) - 0) + 0);
    var hit = (dex*100/agi)/2;        
    
    if(percent > hit){
        DamageAnim("E",x,y);
        attack_type = 0;
        turn[0].attack = false;
        return true;
    }
    return false;
}
