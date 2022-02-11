function Selected(){
    var selected_field = document.getElementById('fd');
    var ground = selected_field.options[selected_field.selectedIndex].value;
    
    var selected_game_type = document.getElementById('gt');
    var game_type = selected_game_type.options[selected_game_type.selectedIndex].value;

    window.localStorage.setItem("ground", ground);
    window.localStorage.setItem("game_type", game_type);
    window.location.replace("html/game.html");
}

// var usuario = { nome: "John Smith da Silva", idade: 29 };
// window.localStorage.setItem('usuario', JSON.stringify(usuario));

// var usuario = JSON.parse(window.localStorage.getItem('usuario'));
// console.log(usuario.nome); 
// console.log(usuario.idade); 