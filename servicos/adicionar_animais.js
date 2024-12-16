window.onload = () => {
    const animal_data = JSON.parse(localStorage.getItem('animal_data'));
    for(k=0; k < animal_data.length ;k++){
        if(animal_data[k].owner === sessionStorage.getItem('user')){
            create_card(animal_data[k]);
        }
    }
};

function send_data(obj){
    console.log(obj);
    // Navigate to the parent card of the clicked button
    const card = obj.closest('.card');
    
    // Extract data from the card (name, sex, and race in this case)
    const name = card.querySelector('.card-title').textContent.trim();
    const sex = card.querySelector('.list-group-item:nth-child(1)').textContent.split(': ')[1].trim();
    const race = card.querySelector('.list-group-item:nth-child(2)').textContent.split(': ')[1].trim();
    const animalData = { name, sex, race };

    sessionStorage.setItem('animal_data', JSON.stringify(animalData));

    window.location.href = "monitorizacao.html";
}

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
        <a class="card-link"><button class="btn btn-primary rounded-5" onclick="send_data(this);">Ir para:</button></a>
        </div>
    </div>`;
}