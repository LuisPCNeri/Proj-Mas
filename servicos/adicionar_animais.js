window.onload = () => {
    const animal_data = JSON.parse(sessionStorage.getItem('animal_data'));
    for(k=0; k < animal_data.length ;k++){
        if(animal_data[k].owner === localStorage.getItem('user')){
            console.log(animal_data[k]);
            create_card(animal_data[k]);
        }
    }
};

function create_card(obj){
    const parent = document.getElementById('animal_content');

    var div_parent = document.createElement('div');
    div_parent.classList.add('col-md-3');
    parent.appendChild(div_parent);

    div_parent.innerHTML = 
    `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"> ${obj.name} </h5>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Sexo: ${obj.sex} </li>
        <li class="list-group-item">Raça: ${obj.race} </li>
        </ul>
        <div class="card-body">
        <a href="monitorizacao.html" class="card-link"><button class="btn btn-primary rounded-5" onlick="send_data(this);">Ir para:</button></a>
        </div>
    </div>`;
}

function send_data(obj){
    localStorage.setItem('animal_data', obj);
}