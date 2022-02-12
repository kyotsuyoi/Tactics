var character;
var turn = new Array();

//////////////////PLAYER 1//////////////////////

character = SetCharacter(
    "warrior",
    "male",
    "wm01", 
    "p1", 
    2, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(7,5,character);

character = SetCharacter(    
    "knight", 
    "female_1",
    "kf01", 
    "p1", 
    2, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(8,5,character);

character = SetCharacter(
    "wizzard",
    "female",
    "wif01", 
    "p1", 
    2, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(9,5,character);

character = SetCharacter(
    "necro",
    "male_1",
    "nm01", 
    "p1", 
    2, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(7,4,character);

character = SetCharacter(
    "archer",
    "female",
    "af0l", 
    "p1", 
    2, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(8,4,character);

character = SetCharacter(
    "healer",
    "female_2",
    "hf01", 
    "p1", 
    2, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(9,4,character);

//////////////////PLAYER 2//////////////////////

var cp_id = "p2";
if (game_type=="2"){ 
    cp_id = "com1"
}

character = SetCharacter(
    "knight",
    "male",
    "km01", 
    cp_id, 
    4, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);  
CharacterPosition(7,11,character);

character = SetCharacter(
    "mage",
    "female",
    "mf01", 
    cp_id, 
    4, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(8,11,character);

character = SetCharacter(
    "warrior",
    "female",
    "wf01", 
    cp_id, 
    4, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(9,11,character);

character = SetCharacter(
    "necro",
    "male_2",
    "nm02", 
    cp_id, 
    4, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(7,12,character);

character = SetCharacter(
    "archer",
    "male_2",
    "am01", 
    cp_id, 
    4, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(8,12,character);

character = SetCharacter(
    "healer",
    "female_1",
    "hf02", 
    cp_id, 
    4, //INITIAL SPRITE
    0, //HP
    0, //SP
    0, //ATK
    0, //DEF
    0, //MATK
    0, //MDEF
    0, //DEX
    0, //AGI
    0, //STEP
    0, //RANGE
    0, //MRANGE
    0, //ARANGE
    0 //ARROW
);
CharacterPosition(9,12,character);

// character = SetCharacter(
//     "wooden_target",
//     "male",
//     "wt", 
//     "p2", 
//     4, //INITIAL SPRITE
//     -200, //HP
//     0, //SP
//     0, //ATK
//     0, //DEF
//     0, //MATK
//     0, //MDEF
//     0, //DEX
//     0, //AGI
//     0, //STEP
//     0, //RANGE
//     0, //MRANGE
//     0, //ARANGE
//     0 //ARROW
// );
// CharacterPosition(8,8,character);
    
turn.sort(function (a, b) {
    if (a.agi > b.agi) {
      return -1;
    }
    if (a.agi < b.agi) {
      return 1;
    }
    return 0;
});
SetTurnBatch();
PointTurn();

//Para inicializar informações e atributos do personagem
function SetCharacter(pclass, sex, id, player_id, sprite, hp, sp, atk, def, matk, mdef, dex, agi, step, range, mrange, arange, arrow){
    var character = new Array();

    switch (pclass){
        case "knight":
            character['hp'] = hp + 220; //200
            character['maxhp'] = character['hp'];     
            character['sp'] = sp + 20; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 35; 
            character['def'] = def + 35; 
            character['matk'] = matk + 0; 
            character['mdef'] = mdef + 5; 
            character['dex'] = dex + 14; 
            character['agi'] = agi + 4; 
        
            character['step'] = step + 2; 
            character['range'] = range + 1; 
            character['mrange'] = mrange + 0; 
            character['arange'] = arange + 2; 
        
            character['arrow'] = arrow + 2; 
            break;

        case "warrior":
            character['hp'] = hp + 150; //140
            character['maxhp'] = character['hp'];     
            character['sp'] = sp + 70; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 22; 
            character['def'] = def + 22; 
            character['matk'] = matk + 22; 
            character['mdef'] = mdef + 22; 
            character['dex'] = dex + 10; 
            character['agi'] = agi + 8; 
        
            character['step'] = step + 2; 
            character['range'] = range + 1; 
            character['mrange'] = mrange + 2; 
            character['arange'] = arange + 2; 
        
            character['arrow'] = arrow + 3; 
            break;

        case "mage":
            character['hp'] = hp + 110; 
            character['maxhp'] = character['hp'];  
            character['sp'] = sp + 100; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 10; 
            character['def'] = def + 10; 
            character['matk'] = matk + 35; 
            character['mdef'] = mdef + 35; 
            character['dex'] = dex + 22; 
            character['agi'] = agi + 2; 
        
            character['step'] = step + 2; 
            character['range'] = range + 1; 
            character['mrange'] = mrange + 2; 
            character['arange'] = arange + 2; 
        
            character['arrow'] = arrow + 0; 
            break;

        case "wizzard":
            character['hp'] = hp + 100; 
            character['maxhp'] = character['hp'];     
            character['sp'] = sp + 120; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 5; 
            character['def'] = def + 5; 
            character['matk'] = matk + 45; 
            character['mdef'] = mdef + 40; 
            character['dex'] = dex + 20; 
            character['agi'] = agi + 1; 
        
            character['step'] = step + 2; 
            character['range'] = range + 1; 
            character['mrange'] = mrange + 2; 
            character['arange'] = arange + 2; 
        
            character['arrow'] = arrow + 0; 
            break;

        case "archer":
            character['hp'] = hp + 100; 
            character['maxhp'] = character['hp'];     
            character['sp'] = sp + 20; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 20; 
            character['def'] = def + 10; 
            character['matk'] = matk + 0; 
            character['mdef'] = mdef + 10; 
            character['dex'] = dex + 15; 
            character['agi'] = agi + 10; 
        
            character['step'] = step + 2; 
            character['range'] = range + 1; 
            character['mrange'] = mrange + 0; 
            character['arange'] = arange + 2; 
        
            character['arrow'] = arrow + 10; 
            break;

        case "healer":
            character['hp'] = hp + 100; 
            character['maxhp'] = character['hp'];     
            character['sp'] = sp + 100; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 10; 
            character['def'] = def + 10; 
            character['matk'] = matk + 40; 
            character['mdef'] = mdef + 45; 
            character['dex'] = dex + 10; 
            character['agi'] = agi + 5; 
        
            character['step'] = step + 2; 
            character['range'] = range + 1; 
            character['mrange'] = mrange + 2; 
            character['arange'] = arange + 2; 
        
            character['arrow'] = arrow + 0; 
            break;
        
        case "necro":
            character['hp'] = hp + 120; 
            character['maxhp'] = character['hp'];     
            character['sp'] = sp + 80; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 20; 
            character['def'] = def + 10; 
            character['matk'] = matk + 20; 
            character['mdef'] = mdef + 10; 
            character['dex'] = dex + 8; 
            character['agi'] = agi + 8; 
        
            character['step'] = step + 2; 
            character['range'] = range + 2; 
            character['mrange'] = mrange + 2; 
            character['arange'] = arange + 0; 
        
            character['arrow'] = arrow + 0; 
            break;

        case "wooden_target":
            character['hp'] = hp + 100000; 
            character['maxhp'] = character['hp'];     
            character['sp'] = sp + 0; 
            character['maxsp'] = character['sp'];  

            character['atk'] = atk + 0; 
            character['def'] = def + 0; 
            character['matk'] = matk + 0; 
            character['mdef'] = mdef + 0; 
            character['dex'] = dex + 0; 
            character['agi'] = agi + 0; 
        
            character['step'] = step + 0; 
            character['range'] = range + 0; 
            character['mrange'] = mrange + 0; 
            character['arange'] = arange + 0; 
        
            character['arrow'] = arrow + 0; 
            break;

        default:
            alert("Personagem sem classe definida");
            return;
    }

    switch (sex){
        case "female":
        case "female_1": //Preciso alterar a variação de sprite
        case "female_2":
            character['sp'] = character['sp'] + 10; 
            character['maxsp'] = character['sp'];  
            character['matk'] = character['matk'] + 10; 
            character['mdef'] = character['mdef'] + 5;
            character['agi'] = character['agi'] + 2; 
            break;
        case "male":
        case "male_1":
        case "male_2":
            character['hp'] = character['hp'] + 20; 
            character['maxhp'] = character['hp'];     
            character['atk'] = character['atk'] + 8; 
            character['def'] = character['def'] + 5; 
            character['dex'] = character['dex'] + 2; 
            break;
        default:
            alert("Personagem sem sexo definido");
            return;
    }

    character['id'] = id;	
    character['p_id'] = player_id; //Player dono do personagem  
    character['pclass'] = pclass; 
    character['sex'] = sex; 
    character['sprite'] = src_path+"character/"+character.pclass+"_"+character.sex+"_"+sprite+".png"; 

    if (character.pclass=="wooden_target"){
        character['sprite'] = src_path+"object/wooden_target.png"; 
    }
    
    character['height'] = 50; 
    character['width'] = 50; 

    character['turn'] = false;  
    AddToBatch(character.id,character.agi,character.pclass,character.p_id,character.sex);  
    return character;
}

//Para definir a posição inicial do personagem
function CharacterPosition(x,y,character){
    field[x][y]=character;	//script-field.js

    var elem = document.createElement("img");
    elem.setAttribute("src", character['sprite']);
    elem.setAttribute("height", character['height']);
    elem.setAttribute("width", character['width']);
    document.getElementById("field_"+x+"-"+y).appendChild(elem);
    document.getElementById("field_"+x+"-"+y).style.cursor="pointer";
}

function SetTurnBatch(){

    document.getElementById("turn").innerHTML="";
    for(i=0;i<=turn.length-1;i++){   
        var elem = document.createElement("img");
        elem.setAttribute("src", src_path+"character/"+turn[i].pclass+"_"+turn[i].sex+"_1.png");
        elem.setAttribute("height", 50);
        elem.setAttribute("width", 50);

        switch (i){
            case 0:
                elem.setAttribute("style", "background:rgba(0, 0, 255, 1)");
                break;
            case 1:
                elem.setAttribute("style", "background:rgba(0, 255, 1, 1)");
                break;
            case 2:
                elem.setAttribute("style", "background:rgba(255, 255, 0, 1)");
                break;
            case 3:
                elem.setAttribute("style", "background:rgba(255, 128, 0, 1)");
                break;
            default:
                elem.setAttribute("style", "background:rgba(255, 0, 0, 1)");
        }
        document.getElementById("turn").appendChild(elem);
    }
}

function AddToBatch(id, agi, pclass, cp_id, sex){ 
    if(pclass=="wooden_target") return;
    turn[turn.length] = new Array();  
    turn[turn.length-1]['id'] = id;  
    // turn[turn.length-1]['p_id'] = p_id;  //Player dono do personagem      
    turn[turn.length-1]['cp_id'] = cp_id;  //Player controlando o personagem  
    turn[turn.length-1]['agi'] = agi;  
    turn[turn.length-1]['pclass'] = pclass;  
    turn[turn.length-1]['sex'] = sex;  
    turn[turn.length-1]['attack'] = true;
    turn[turn.length-1]['walk'] = true;    
}

function RemoveFromBatch(id,p_id){
    var temp_turn = new Array();
    var pos = 0;
    var count = 0;
    for(i=0;i<=turn.length-1;i++){
        if(id != turn[i].id){
            temp_turn[pos] = turn[i];
            pos++;
        }
        turn[i].id
    }

    turn = temp_turn;

    for(i=0;i<=turn.length-1;i++){
        if(p_id == turn[i].cp_id){
            count++;
        }
    }

    if(count==0){
        
        document.getElementById('block').style.display='inline';        
        var text = document.createElement("p");
        if (p_id=="p1"){
            if (game_type=="2"){                            
                text.textContent = "Computador venceu!";
            }else{
                text.textContent = "Jogador 2 venceu!";
            }
            text.setAttribute("style", "font-size: 90px; text-align: center; color: red;");
        }else{
            text.textContent = "Jogador 1 venceu!";
            text.setAttribute("style", "font-size: 90px; text-align: center; color: blue;");
        }
        document.getElementById('block').appendChild(text); 
        end_game = true 
    }

}

function getControlPlayerIDFromBatch(id){
    for(i=0;i<=turn.length-1;i++){  
        if(id == turn[i].id){
            return turn[i].cp_id;
        }
    }
}

function EndTurn(){
    temp = turn[0];
    for(i=0;i<=turn.length-1;i++){  
        turn[i] = turn[i+1];
    }
    turn[turn.length-1] = temp;

    PointTurn();
}

//Apresenta o turno de cada jogador
function PointTurn(){                         
    if(end_game)return  
    var x, y;
    for(x=1;x<=field.length-1;x++){ 
        for(y=1;y<=field.length-1;y++){ 
            if(field[x][y].character != false){
                if(field[x][y].id == turn[0].id){
                    document.getElementById('field_'+x+"-"+y).style.backgroundColor = "rgba(240, 236, 7, 0.7)";
                    
                    document.getElementById('block').style.display='inline';                     
                     
                    if (turn[0].cp_id=="p1"){
                        document.getElementById('p_turn').innerText = "Jogador 1";
                        document.getElementById('p_turn').style = "font-size: 90px; text-align: center; color: blue";
                    }else{
                        if (game_type=="2"){                            
                            document.getElementById('p_turn').innerText = "Computador";                             
                            //setBot(x,y);
                            callSetTimeout(x,y)
                        }else{                            
                            document.getElementById('p_turn').innerText = "Jogador 2";
                        }
                        document.getElementById('p_turn').style = "font-size: 90px; text-align: center; color: red";
                    }

                    setTimeout(function () {                             
                        document.getElementById('block').style.display='none';
                        document.getElementById('p_turn').innerText = "";
                    }, 1000);

                    x=field.length;
                    y=field.length;
                }
            }
        }
    }
}

function callSetTimeout(x,y){
    setTimeout(function(){                                
        setBot(x,y);
    },2000);
}

    
