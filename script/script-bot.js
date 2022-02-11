var enemies = new Array();
var bot_x, bot_y;
var bot_step;

function setBot(x,y){
    bot_x = x;
    bot_y = y;
    getEnemies();
    enemy = getClosestEnemy();    
    Selected(x,y);

    findWalk(x,y,enemy);
}

function findWalk(x,y,enemy){
    bot_move_x = x; 
    bot_move_y = y;
    bot_step = selected_field.step;    
    move_cancel = false;       
    move_style = 0;     

    Action("walk");

    enemy_move_x = Math.abs(enemy.move_x);
    enemy_move_y = Math.abs(enemy.move_y);

    if(enemy_move_x <= enemy_move_y){              
        move_style = 1; 
        firstUpDown(enemy);
        move_cancel = secondLeftRight(enemy);
    }else{            
        move_style = 2; 
        firstLeftRight(enemy);
        move_cancel = secondUpDown(enemy);
    }

    if (!move_cancel){
        if(!WalkTo(bot_move_x,bot_move_y)){
            console.log("Nao pode mover para:" + bot_move_x + "-" + bot_move_y);
            bot_move_x = x; 
            bot_move_y = y;
            bot_step = selected_field.step;  
            if(move_style == 1){
                firstLeftRight(enemy);
                move_cancel = secondUpDown(enemy);
            }else{
                firstUpDown(enemy);
                move_cancel = secondLeftRight(enemy);                
            }
            if (!move_cancel){
                if(!WalkTo(bot_move_x,bot_move_y)){
                    console.log("Nao pode mover para:" + bot_move_x + "-" + bot_move_y);
                }
            }
        } 
    }
    
    action=undefined;
    selected_x = x;
    selected_y = y;
    RedoMoveRange(); //script-step

    enemies = new Array();
    bot_x = 0;
    bot_y = 0;

    Action("end");

}

function getEnemies(){
    var x, y; 

    for(x=1;x<=field.length-1;x++){ 
        for(y=1;y<=field.length-1;y++){ 
            if(field[x][y].character != false){
                if(field[x][y].p_id != undefined && field[x][y].p_id != turn[0].cp_id){

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

function firstUpDown(enemy){
    if (enemy.x < bot_move_x) { //subir  
        bot_move_x = bot_move_x - bot_step;
        bot_step = 0;
        while(bot_move_x < enemy.x){
            bot_move_x++;
            bot_step++;
        }
    }

    if (enemy.x > bot_move_x) { //descer 
        bot_move_x = bot_move_x + bot_step;
        bot_step = 0;
        while(bot_move_x > enemy.x){
            bot_move_x--;
            bot_step++;
        }
    }
}

function secondLeftRight(enemy){    
    if (enemy.y < bot_move_y & bot_step > 0) { //esquerda
        bot_move_y = bot_move_y - bot_step;
        if(bot_move_y == enemy.y){
            bot_move_y++;
        }
        if(bot_move_y < enemy.y){
            return true;
        }
    }

    if (enemy.y > bot_move_y & bot_step > 0) { //direita
        bot_move_y = bot_move_y + bot_step;
        if(bot_move_y == enemy.y){
            bot_move_y--;
        }
        if(bot_move_y > enemy.y){
            return true;
        }
    }
    return false;
}

function firstLeftRight(){
    if (enemy.y < bot_move_y) { //esquerda  
        bot_move_y = bot_move_y - bot_step;
        bot_step = 0;
        while(bot_move_y < enemy.y){
            bot_move_y++;
            bot_step++;
        }
    }

    if (enemy.y > bot_move_y) { //direita 
        bot_move_y = bot_move_y + bot_step;
        bot_step = 0;
        while(bot_move_y > enemy.y){
            bot_move_y--;
            bot_step++;
        }
    }
}

function secondUpDown(){
    if (enemy.x < bot_move_x & bot_step > 0) { //subir
        bot_move_x = bot_move_x - bot_step;
        if(bot_move_x == enemy.x){
            bot_move_x++;
        }
        if(bot_move_x < enemy.x){
            return true;
        }
    }

    if (enemy.x > bot_move_x & bot_step > 0) { //descer
        bot_move_x = bot_move_x + bot_step;
        if(bot_move_x== enemy.x){
            bot_move_x--;
        }
        if(bot_move_x > enemy.x){
            return true;
        }
    }
    return false;
}

