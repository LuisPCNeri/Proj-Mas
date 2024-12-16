let inputPrecoTotal = document.getElementById("total");
let inputQtdTotal = document.getElementById("quantidades");
let precoTotal = 0;
let qtdTotal = 0;

$(document).ready( () => {
    const products = JSON.parse(localStorage.getItem('products'));
    const reader = new FileReader();
    let rows = document.getElementsByClassName('product_row');

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
            new_row.classList.add('row', 'product_row');
            document.getElementById('form').appendChild(new_row);
            rows = document.getElementsByClassName('product_row');
        }
        console.log(products[k]);
        var new_card = document.createElement('div');
        new_card.classList.add('col-sm-3', 'mt-5');
        new_card.innerHTML = 
        `
            <img src='${products[k].image}'>
            <h5>${products[k].name}<br/><small>${products[k].id}</small></h5>
            <div class="text-danger text-start"> ${products[k].price}<input id="price6" name="price6" class="text-danger text-right border-0" readonly></div>
            <button type="button" class="btn btn-primary rounded-5 add-to-cart" data-price="${products[k].price}"><iclass="fa fa-paw"></i> Adicionar ao meu cesto</button>
        `;
        rows[rows.length - 1].appendChild(new_card);

    }
});

$(document).on('click', '.add-to-cart', function () {
    const price = $(this).data('price');
    console.log(price);
    adicionar(price);
});

// Update total quantity and price
function adicionar(price) {
    qtdTotal += 1;
    inputQtdTotal.innerHTML = qtdTotal;

    adicionarPrice(price);
}

function adicionarPrice(price) {
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, '')); // Remove currency symbols
    precoTotal += numericPrice;

    console.log(precoTotal);
    inputPrecoTotal.innerHTML = precoTotal.toFixed(2); // Update with two decimal places
}

function addProduct(number) {
    let quantidadeProdutoSelecionado = document.getElementById("qty" + number);
    quantidadeProdutoSelecionado.value++;
    calculate();
}

function calculate() {
    let precAtual, qtdAtual;
    precoTotal = 0;
    qtdTotal = 0;

    for (let i = 1; i <= 8; i++) {
        precAtual = parseFloat(document.getElementById('price' + i).value);
        qtdAtual = parseFloat(document.getElementById('qty' + i).value);
        precoTotal += precAtual * qtdAtual;
        qtdTotal += qtdAtual;
    }

    inputQtdTotal.innerText = qtdTotal++;
    inputPrecoTotal.innerText = precoTotal.toFixed(2);
}

function valid() {
    if (precoTotal <= 0 && qtdTotal <= 0) {
        alert("Erro! O carrinho está vazio");
        return false;
    } else {
        return true
    }
}

function clean() {
    for (let i = 1; i <= 8; i++) {
        qtdAtual = document.getElementById('qty' + i).value = 0;
    }
    precoTotal = 0;
    qtdTotal = 0;
    inputPrecoTotal.innerText = "0.00";
    inputQtdTotal.innerText = 0;
}
