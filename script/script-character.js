var character;
var turn = new Array();

character = SetCharacter(
    "warrior_girl", 
    "src/warrior_girl_2.png",
    200, //HP
    20, //SP
    30, //ATK
    20, //DEF
    5, //MATK
    5, //MDEF
    12, //DEX
    4, //AGI
    2, //STEP
    1, //RANGE
    1 //MRANGE
);
CharacterPosition(8,5,character);

character = SetCharacter(
    "wizzard_girl", 
    "src/wizzard_girl_2.png",
    100, //HP
    120, //SP
    10, //ATK
    5, //DEF
    40, //MATK
    25, //MDEF
    20, //DEX
    1, //AGI
    1, //STEP
    1, //RANGE
    2 //MRANGE
);
CharacterPosition(9,5,character);

character = SetCharacter(
    "squire_man", 
    "src/squire_man_2.png",
    180, //HP
    25, //SP
    35, //ATK
    15, //DEF
    5, //MATK
    10, //MDEF
    10, //DEX
    5, //AGI
    2, //STEP
    1, //RANGE
    1 //MRANGE
);
CharacterPosition(7,5,character);

character = SetCharacter(
    "mage_girl", 
    "src/mage_girl_4.png",
    120, //HP
    100, //SP
    10, //ATK
    5, //DEF
    35, //MATK
    30, //MDEF
    22, //DEX
    1, //AGI
    1, //STEP
    1, //RANGE
    2 //MRANGE
);
CharacterPosition(8,11,character);

character = SetCharacter(
    "squire_girl", 
    "src/squire_girl_4.png",
    180, //HP
    25, //SP
    30, //ATK
    15, //DEF
    5, //MATK
    10, //MDEF
    10, //DEX
    6, //AGI
    2, //STEP
    1, //RANGE
    1 //MRANGE
);
CharacterPosition(9,11,character);

character = SetCharacter(
    "warrior_man", 
    "src/warrior_man_4.png",
    200, //HP
    15, //SP
    30, //ATK
    20, //DEF
    5, //MATK
    5, //MDEF
    10, //DEX
    4, //AGI
    2, //STEP
    1, //RANGE
    1 //MRANGE
);
CharacterPosition(7,11,character);

turn.sort(function (a, b) {
    if (a.agi > b.agi) {
      return -1;
    }
    if (a.agi < b.agi) {
      return 1;
    }
    // a must be equal to b
    return 0;
});

SetTurnBatch();

//Para inicializar informações e atributos do personagem
function SetCharacter(name, sprite, hp, sp, atk, def, matk, mdef, dex, agi, step, range, mrange){
    var character = new Array();

    character['name'] = name;	
    character['sprite'] = sprite; 

    character['hp'] = hp; character['maxhp'] = hp;     
    character['sp'] = sp; character['maxsp'] = sp;     
    character['atk'] = atk; 
    character['def'] = def; 
    character['matk'] = matk; 
    character['mdef'] = mdef; 
    character['dex'] = dex; 
    character['agi'] = agi; 

    character['step'] = step; 
    character['range'] = range; 
    character['mrange'] = mrange; 
    
    character['height'] = 50; 
    character['width'] = 50; 

    character['turn'] = false;  
    CharacterTurn(agi, name);  
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
}

function CharacterTurn(agi,name){ 
    turn[turn.length] = new Array();  
    turn[turn.length-1]['name'] = name;  
    turn[turn.length-1]['agi'] = agi;  
    turn[turn.length-1]['attack'] = true;
    turn[turn.length-1]['walk'] = true;    
}

function SetTurnBatch(){
    document.getElementById("turn").innerHTML="";
    for(i=0;i<=turn.length-1;i++){   
        var elem = document.createElement("img");
        elem.setAttribute("src", "src/"+turn[i].name+"_1.png");
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

    
