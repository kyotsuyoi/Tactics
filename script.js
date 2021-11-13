function Selected(){
    var select = document.getElementById('fd');
    var ground = select.options[select.selectedIndex].value;
    window.localStorage.setItem("ground", ground);
    window.location.replace("html/game.html");
}

// var usuario = { nome: "John Smith da Silva", idade: 29 };
// window.localStorage.setItem('usuario', JSON.stringify(usuario));

// var usuario = JSON.parse(window.localStorage.getItem('usuario'));
// console.log(usuario.nome); 
// console.log(usuario.idade); 