field = new Array(); 
// imagePrefix = "g";

//Cria e posiciona todas as div do campo visual do jogo (id e onClick)
function NewField(size){
    var x=0, y=0;    

    for(x=1;x<=size;x++){                     
        for(y=1;y<=size;y++){
            var elem = document.createElement("div");
            elem.setAttribute("id", "field_"+x+"-"+y);  
            elem.setAttribute("onClick", "Selected("+x+","+y+")");  
            document.getElementById("field").appendChild(elem);             
        }
    }  
    
    SetField(size)
}

//Cria o array onde serão posicionados os personagens no campo logico do jogo
function SetField(size){
    var x,y;           

    for(x=1;x<=size;x++){   
        field[x] = new Array();                     
        for(y=1;y<=size;y++){                
            field[x][y] = new Array();  
            field[x][y]['character'] = false;          
        }
    } 
}

// function SetGround(imagePrefix){
//     document.getElementById("field").style.backgroundImage = 'url(src/' + imagePrefix + '.jpg)';
// }