window.onload = () => {
    console.log(JSON.parse(localStorage.getItem('animal_data')));
    const animal = JSON.parse(localStorage.getItem('animal_data'));
    document.getElementById('nome').value = animal.name;
}

function save_data(){
    const animal = JSON.parse(localStorage.getItem('animal_data'));

    const animal_data = new Object();
        animal_data.history = document.getElementById('historico').value;
        animal_data.rotine = document.getElementById('rotinas').value;
        animal_data.vaccines = document.getElementById('vacinas').value;

        animal_data.name = animal.name;
        animal_data.owner = animal.email;
        animal_data.sex = animal.sex;
        animal_data.race = animal.raca;

    let all_data = JSON.parse(sessionStorage.getItem('animal_data')) || [];
    all_data.push(animal_data);
    sessionStorage.setItem('animal_data', JSON.stringify(all_data));

    console.log(JSON.parse(sessionStorage.getItem('animal_data')));
    window.location.href = 'adicionar-animal.html';
}