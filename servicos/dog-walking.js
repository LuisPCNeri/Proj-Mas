
$(document).ready( () => {
    const products = JSON.parse(localStorage.getItem('walkers'));
    const reader = new FileReader();
    let rows = document.getElementsByClassName('card-row');

    reader.onload = function(e)  {
        var image = document.createElement("img");
        // the result image data
        image.src = e.target.result;
        document.body.appendChild(image);
     }

    for(k=0; k < products.length; k++){
        //Pega em todas as rows de produtos
        //Pega na ultima e verifica se está cheia
        //Adiciona a esse se tiver espaço, cria outra se estiver cheia
        if(rows[rows.length - 1].children.length === 4){
            var new_row = document.createElement('div');
            new_row.classList.add('row', 'card-row');
            document.getElementById('card_container').appendChild(new_row);
            rows = document.getElementsByClassName('card-row');
        }
        console.log(products[k]);
        var new_card = document.createElement('div');
        new_card.classList.add('col-md-3', 'mt-3', 'mb-4');//col-md-3 mt-3 mb-4
        new_card.innerHTML = 
        `
        <div class="card" style="width: 18rem;">
            <img src="${products[k].image}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text" style="text-align: center;">Nº telemóvel: ${products[k].phone} <br> rating: ${products[k].rating} <br> ${products[k].description}<br>preço: ${products[k].price}</p>
            </div>
        </div>
        `;
        rows[rows.length - 1].appendChild(new_card);

    }
});