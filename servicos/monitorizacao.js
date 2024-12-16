window.onload = () => {
    console.log(localStorage.getItem('animal_data'));
    const animal = JSON.parse(sessionStorage.getItem('animal_data'));
    const animal_data = JSON.parse(localStorage.getItem('animal_data'));

    for(k=0; k < animal_data.length; k++){
        if(animal_data[k].name === animal.name && animal_data[k].owner === sessionStorage.getItem('user')){
            document.getElementById('name').value = animal_data[k].name;
            document.getElementById('history').value = animal_data[k].history;
            document.getElementById('rotine').value = animal_data[k].rotine;
            document.getElementById('vaccines').value = animal_data[k].vaccines;
        }
    }
};