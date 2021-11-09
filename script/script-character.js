var character;

character = SetCharacter(
    "warrior_girl", 
    "src/warrior_girl_1.png",
    200, //HP
    20, //SP
    20, //ATK
    25, //DEF
    5, //MATK
    5, //MDEF
    2, //STEP
    1, //RANGE
    1 //RANGE
);
CharacterPosition(1,5,character);

character = SetCharacter(
    "mage_girl", 
    "src/mage_girl_1.png",
    120, //HP
    100, //SP
    5, //ATK
    5, //DEF
    35, //MATK
    30, //MDEF
    1, //STEP
    1, //RANGE
    2 //RANGE
);
CharacterPosition(1,4,character);

//Para inicializar informações e atributos do personagem
function SetCharacter(name, sprite, hp, sp, atk, def, matk, mdef, step, range, m_range){
    var character = new Array();

    character['name'] = name;	
    character['sprite'] = sprite; 

    character['hp'] = hp; character['maxhp'] = hp;     
    character['sp'] = sp; character['maxsp'] = sp;     
    character['atk'] = atk; 
    character['def'] = def; 
    character['matk'] = matk; 
    character['mdef'] = mdef; 
    character['step'] = step; 
    character['range'] = range; 
    character['m_range'] = m_range; 

    character['turn'] = false;      
    return character;
}

//Para definir a posição inicial do personagem
function CharacterPosition(x,y,character){
    field[x][y]=character;	//script-field.js

    var elem = document.createElement("img");
    elem.setAttribute("src", character['sprite']);
    elem.setAttribute("height", "65");
    elem.setAttribute("width", "65");
    document.getElementById("field_"+x+"-"+y).appendChild(elem);
}
  

    
