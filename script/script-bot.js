var enemies = new Array();
var allies = new Array();
var bot_x, bot_y;
var bot_step;

var attacked = false;
var walked = false;

function setBot(x,y){
    com_pass = true;
    bot_x = x;
    bot_y = y;
    getEnemies();
    enemy = getClosestEnemy();    
    Selected(x,y);

    // tryWalk(x,y,enemy);
      
    // Selected(bot_x,bot_y);
    // findAttack(enemy);  
    
    // setTimeout(function () {   
        
    //     if(!walked){
    //         walkAway(enemy)
    //     }
    //     Action("end");        
    //     enemies = new Array();
    //     com_pass = false
    //     walked = false
    //     attacked = false
    // }, 2000);
      
    findAttack(enemy);    
    if(attacked){
        setTimeout(function () {   
            tryAgain();
        }, 2000);
    }else{
        tryAgain();
    }     
}

function tryAgain(){
    if(attacked){
        walkAway(enemy);
    }else{
        tryWalk(enemy);
        Selected(bot_x,bot_y); 
        findAttack(enemy);
    }

    if(attacked){
        setTimeout(function () {  
            endBotTurn();
        }, 2000);
    }else{
        if(!walked){
            tryWalk(enemy);
        }
        endBotTurn();
    }  
}

function endBotTurn(){
    Action("end");        
    enemies = new Array();
    com_pass = false;
    walked = false;
    attacked = false;
}

function tryWalk(enemy){
    Action("walk"); 
      
    move_cancel = false;   
    if (bot_x == enemy.x){
        if (Math.abs(bot_y-enemy.y)<2){
            move_cancel = true
        }
    }
    if (bot_y == enemy.y){
        if (Math.abs(bot_x-enemy.x)<2){
            move_cancel = true
        }
    }

    possible_move.forEach(element => {       
        element['enemy_move_x'] = element.x - enemy.x;
        element['enemy_move_y'] = element.y - enemy.y;
        var total_move = Math.abs(element.enemy_move_x) + Math.abs(element.enemy_move_y);//converte o numero para positivo
        element['total_move'] = total_move;
    })

    possible_move.sort(function (a, b) {
        if (a.total_move > b.total_move) {
          return 1;
        }
        if (a.total_move < b.total_move) {
          return -1;
        }
        return 0;
    });

    function getVal(value) {
        return value.total_move == possible_move[0].total_move;
    }    
    var filtered = possible_move.filter(getVal);

    random_index = Math.floor(Math.random() * (filtered.length));

    selected_move_x = possible_move[random_index].x
    selected_move_y = possible_move[random_index].y

    if(!move_cancel){
        if(!WalkTo(possible_move[random_index].x,possible_move[random_index].y)){
            console.log(selected_field.id + " não pode mover para:" + possible_move[random_index].x + "-" + possible_move[random_index].y + " / distancias:" + possible_move[random_index].enemy_move_x + "-" + possible_move[random_index].enemy_move_y);
        }
        
        selected_x = selected_move_x;
        selected_y = selected_move_y;        
        bot_x = selected_move_x
        bot_y = selected_move_y

        walked = true
    }    

    action = undefined;
    RedoMoveRange(); //script-step
}

function walkAway(enemy){
    Action("walk"); 

    possible_move.forEach(element => {       
        element['enemy_move_x'] = element.x - enemy.x;
        element['enemy_move_y'] = element.y - enemy.y;
        var total_move = Math.abs(element.enemy_move_x) + Math.abs(element.enemy_move_y);//converte o numero para positivo
        element['total_move'] = total_move;
    })

    possible_move.sort(function (a, b) {
        if (a.total_move > b.total_move) {
          return -1;
        }
        if (a.total_move < b.total_move) {
          return 1;
        }
        return 0;
    });

    function getVal(value) {
        return value.total_move == possible_move[0].total_move;
    }    
    var filtered = possible_move.filter(getVal);

    random_index = Math.floor(Math.random() * (filtered.length));

    selected_move_x = possible_move[random_index].x
    selected_move_y = possible_move[random_index].y

    if(!WalkTo(possible_move[random_index].x,possible_move[random_index].y)){
        console.log(selected_field.id + " não pode mover para:" + possible_move[0].x + "-" + possible_move[0].y + " / distancias:" + possible_move[0].enemy_move_x + "-" + possible_move[0].enemy_move_y);
    }
    
    selected_x = selected_move_x;
    selected_y = selected_move_y;        
    bot_x = selected_move_x
    bot_y = selected_move_y

    walked = true    

    action = undefined;
    RedoMoveRange();
}

function getEnemies(){
    var x, y; 

    for(x=1;x<=field.length-1;x++){ 
        for(y=1;y<=field.length-1;y++){ 
            if(field[x][y].character != false){
                //if(field[x][y].p_id != undefined && field[x][y].p_id != turn[0].cp_id){
                cpid = getControlPlayerIDFromBatch(field[x][y].id)
                if(cpid != cp_id){
                    var enemy = field[x][y];
                    enemy['x'] = x;
                    enemy['y'] = y;
                    enemy['move_x'] = x - bot_x;
                    enemy['move_y'] = y - bot_y;
                    var total_move = Math.abs(enemy.move_x) + Math.abs(enemy.move_y);//converte o numero para positivo
                    enemy['total_move'] = total_move;
                    enemies.push(enemy);
                }
            }
        }
    }
}

function getClosestEnemy(){
    enemies.sort(function (a, b) {
        if (a.total_move > b.total_move) {
          return -1;
        }
        if (a.total_move < b.total_move) {
          return 1;
        }
        return 0;
    });

    return enemies[enemies.length-1];
}

function getAllies(){
    var x, y; 

    for(x=1;x<=field.length-1;x++){ 
        for(y=1;y<=field.length-1;y++){ 
            if(field[x][y].character != false){
                //if(field[x][y].p_id != undefined && field[x][y].p_id == turn[0].cp_id && field[x][y].id != selected_field.id){
                cpid = getControlPlayerIDFromBatch(field[x][y].id)
                if(cpid == undefined){
                    cpid = field[x][y].p_id;
                }
                if(cpid == cp_id){
                    var ally = field[x][y];
                    ally['x'] = x;
                    ally['y'] = y;
                    ally['move_x'] = x - bot_x;
                    ally['move_y'] = y - bot_y;
                    var total_move = Math.abs(ally.move_x) + Math.abs(ally.move_y);//converte o numero para positivo
                    ally['total_move'] = total_move;
                    allies.push(ally);
                }
            }
        }
    }
}

function getAllyLessHP(){
    allies.sort(function (a, b) {
        if (a.hp > b.hp) {
          return -1;
        }
        if (a.hp < b.hp) {
          return 1;
        }
        return 0;
    });

    return allies[allies.length-1];
}

function findAttack(enemy){
    if (selected_field.sp > 15 && (selected_field.pclass == "mage" || selected_field.pclass == "wizzard")){
        Action("magic"); 
    }else
    if(selected_field.sp > 15 && selected_field.pclass == "healer"){    
        getAllies();
        ally = getAllyLessHP();
        if(ally.hp < ally.maxhp/2){
            enemy = ally;
            Action("magic");
        }else{
            getEnemies();
            enemy = getClosestEnemy();
            Action("attack"); 
        }
    }else
    if(selected_field.arrow > 0){
        Action("arrow"); 
    }else{        
        Action("attack"); 
    }

    possible_attack.forEach(element => {       
        element['enemy_distance_x'] = element.x - enemy.x;
        element['enemy_distance_y'] = element.y - enemy.y;
        var total_distance = Math.abs(element.enemy_distance_x) + Math.abs(element.enemy_distance_y);//converte o numero para positivo
        element['total_distance'] = total_distance;
    })

    possible_attack.sort(function (a, b) {
        if (a.total_distance > b.total_distance) {
          return -1;
        }
        if (a.total_distance < b.total_distance) {
          return 1;
        }
        return 0;
    });

    var i;
    var is_attack = false;
    for(i=0;i<=possible_attack.length-1;i++){ 
        if(possible_attack[i].x == enemy.x && possible_attack[i].y == enemy.y){
            is_attack=true;
            i=possible_attack.length;
        }
    }

    if(is_attack){
        if(!AttackTo(enemy.x,enemy.y)){
            console.log(selected_field.id + " não pode atacar:" + enemy.x + "-" + enemy.y);
        }     
        // selected_x = selected_move_x;
        // selected_y = selected_move_y;  
        // bot_x = selected_move_x
        // bot_y = selected_move_y 
        attacked = true
    }  

    action = undefined;
    RedoAttackRange(); //script-step
}

function healAlly(){
}


// function findWalk(x,y,enemy){
//     bot_move_x = x; 
//     bot_move_y = y;
//     bot_step = selected_field.step;    
//     move_cancel = false;       
//     move_style = 0;     

//     Action("walk");

//     enemy_move_x = Math.abs(enemy.move_x);
//     enemy_move_y = Math.abs(enemy.move_y);

//     //para diminuir a maior distancia (x ou y)
//     if(enemy_move_x >= enemy_move_y){              
//         move_style = 1; 
//         firstUpDown(enemy);
//         move_cancel = secondLeftRight(enemy);
//     }else{            
//         move_style = 2; 
//         firstLeftRight(enemy);
//         move_cancel = secondUpDown(enemy);
//     }

//     if (!move_cancel){
//         if(!WalkTo(bot_move_x,bot_move_y)){
//             console.log(selected_field.id + " não pode mover para:" + bot_move_x + "-" + bot_move_y + " / distancias:" + enemy_move_x + "-" + enemy_move_y);
//             bot_move_x = x; 
//             bot_move_y = y;
//             bot_step = selected_field.step;  
//             if(move_style == 1){
//                 firstLeftRight(enemy);
//                 move_cancel = secondUpDown(enemy);
//             }else{
//                 firstUpDown(enemy);
//                 move_cancel = secondLeftRight(enemy);                
//             }
//             if (!move_cancel){
//                 if(!WalkTo(bot_move_x,bot_move_y)){
//                     console.log(selected_field.id + " não pode mover para:" + bot_move_x + "-" + bot_move_y + " / distancias:" + enemy_move_x + "-" + enemy_move_y);
//                 }
//             }
//         } 
//     }
    
//     action=undefined;
//     selected_x = x;
//     selected_y = y;
//     RedoMoveRange(); //script-step

//     enemies = new Array();
//     bot_x = 0;
//     bot_y = 0;

//     Action("end");
// }

// function firstUpDown(enemy){
//     if (enemy.x < bot_move_x) { //subir  
//         bot_move_x = bot_move_x - bot_step;
//         bot_step = 0;
//         while(bot_move_x < enemy.x){
//             bot_move_x++;
//             bot_step++;
//         }
//     }

//     if (enemy.x > bot_move_x) { //descer 
//         bot_move_x = bot_move_x + bot_step;
//         bot_step = 0;
//         while(bot_move_x > enemy.x){
//             bot_move_x--;
//             bot_step++;
//         }
//     }
// }

// function secondLeftRight(enemy){    
//     if (enemy.y < bot_move_y & bot_step > 0) { //esquerda
//         bot_move_y = bot_move_y - bot_step;
//         if(bot_move_y == enemy.y){
//             bot_move_y++;
//         }
//         if(bot_move_y < enemy.y){
//             return true;
//         }
//     }

//     if (enemy.y > bot_move_y & bot_step > 0) { //direita
//         bot_move_y = bot_move_y + bot_step;
//         if(bot_move_y == enemy.y){
//             bot_move_y--;
//         }
//         if(bot_move_y > enemy.y){
//             return true;
//         }
//     }
//     return false;
// }

// function firstLeftRight(){
//     if (enemy.y < bot_move_y) { //esquerda  
//         bot_move_y = bot_move_y - bot_step;
//         bot_step = 0;
//         while(bot_move_y < enemy.y){
//             bot_move_y++;
//             bot_step++;
//         }
//     }

//     if (enemy.y > bot_move_y) { //direita 
//         bot_move_y = bot_move_y + bot_step;
//         bot_step = 0;
//         while(bot_move_y > enemy.y){
//             bot_move_y--;
//             bot_step++;
//         }
//     }
// }

// function secondUpDown(){
//     if (enemy.x < bot_move_x & bot_step > 0) { //subir
//         bot_move_x = bot_move_x - bot_step;
//         if(bot_move_x == enemy.x){
//             bot_move_x++;
//         }
//         if(bot_move_x < enemy.x){
//             return true;
//         }
//     }

//     if (enemy.x > bot_move_x & bot_step > 0) { //descer
//         bot_move_x = bot_move_x + bot_step;
//         if(bot_move_x== enemy.x){
//             bot_move_x--;
//         }
//         if(bot_move_x > enemy.x){
//             return true;
//         }
//     }
//     return false;
// }

