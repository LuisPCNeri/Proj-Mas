$(document).ready(function () {
    //--- Variáveis globais

    //--- Funções globais
    $("#exampleInputBirthDate1").datepicker({       //--- datepicker: JqueryUI
        changeYear: true,
        changeMonth: true,
        dateFormat: 'yy/mm/dd',
        yearRange: "-20:-0"
    });
    $("#exampleInputBirthDate2").datepicker({       
        changeYear: true,
        changeMonth: true,
        dateFormat: 'yy/mm/dd',
        yearRange: "-20:-0"
    });
    //--- viewmodel - métodos e dados
    function MyViewModel() {
        //--- Variáveis do viewmodel
        //---
        //-- Fazemos sempre a cópia da variável 'this' para outra variável, pois o 'this' varia consoante o contexto
        var self = this;        
        //--- Variável contendo um Participante tmp. Usado nas operações de EDIT
        self.tmp = null;
        //--- Array de Observáveis contendo a LISTA de participantes
        self.participants = ko.observableArray();
        //--- Variável computada que nos indica se a LISTA possui/não possui elementos
        self.hasParticipants = ko.computed(function () {
            var retVal = (self.participants().length > 0);
            console.log('hasParticipants: ' + retVal);
            return retVal;
        }, self);
        //--- Métodos do viewmodel
        //---
        //--- Método de atualização da LISTA recolhidos na Modal CREATE
        self.createParticipant = function () {
            var participant = { 'name': '', 'email': '', 'address': '', 'birthDate': '', 'sex': '', 'raca': { 'id': '', 'name': '' } };
            console.log('createParticipant');
            //--- carrega um novo participante na lista
            participant.name = $("#exampleInputName1").val();
            participant.email = $("#exampleInputEmail1").val();
            participant.address = $("#exampleInputAddress1").val();
            participant.birthDate = $("#exampleInputBirthDate1").val();
            participant.sex = $("#createParticipantModal input[type=radio]:checked").val();
            participant.raca= $("#exampleInputraca1").val();
            //--- insere novo participante na lista
            let animals = JSON.parse(localStorage.getItem('animals')) || [];
            console.log(animals);
            animals.push(participant);
            localStorage.setItem('animals', JSON.stringify(animals));

            self.participants.push(participant);
            console.log(participant);
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
                function (left, right) {
                    return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
                });
            $("#createParticipantModal").modal('toggle');

            send_data(participant);
        };
        //--- Método de carregamento de dados na Modal EDIT
        self.readParticipant = function (participant) {
            self.tmp = participant;
            console.log('readParticipant', "[" + participant.name + "]");
            $("#exampleInputName2").val(participant.name);
            $("#exampleInputEmail2").val(participant.email);
            $("#exampleInputAddress2").val(participant.address);
            $("#exampleInputBirthDate2").val(participant.birthDate);
            if (participant.sex != '') {
                $("#readParticipantModal [name = exampleInputSex2][value=" + participant.sex + "]").prop('checked', true);
            }
            else {
                $("#readParticipantModal [name = exampleInputSex2]").prop('checked', false);
            }
            $('#exampleInputraca2').val(participant.raca);
        };
        //--- Método de carregamento de dados na LISTA
        self.readParticipants = function () {
            console.log('init');
            //--- carrega a lista com um conjunto de participantes
            for(i=0; i < JSON.parse(localStorage.getItem('animals')).length; i++){
                self.participants.push(JSON.parse(localStorage.getItem('animals'))[i])
            }
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
                function (left, right) {
                    return left.name === right.name ? 0 : (left.name < right.name ? -1 : 1)
                });
        };
        //--- Método de atualização de dados na LISTA recolhidos na Modal EDIT
        self.updateParticipant = function (participant) {
            console.log('updateParticipant', participant);
            //--- remove o item selecionado para edição da lista
            self.participants.remove(self.tmp);
            //--- altera o item temporário
            self.tmp.name = $("#exampleInputName2").val();
            self.tmp.email = $("#exampleInputEmail2").val();
            self.tmp.address = $("#exampleInputAddress2").val();
            self.tmp.birthDate = $("#exampleInputBirthDate2").val();
            self.tmp.sex = $("#readParticipantModal input[type=radio]:checked").val();
            self.tmp.raca= $("#exampleInputraca2").val();
            //--- coloca novo elemento na lista
            self.participants.push(self.tmp);
            //--- limpa o objeto tmp
            self.tmp = null;
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
                function (left, right) {
                    return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1)
                });
            //--- apaga a modal
            $("#readParticipantModal").modal('toggle');
            //--- debug
            console.log(self.participants());
        };
        //--- Método para apagar uma pariticipante da LISTA
        self.deleteParticipant = function (participant) {
            console.log('deleteParticipant');
            //--- apaga um participante da lista 
            let animals = JSON.parse(localStorage.getItem('animals'));
            console.log(participant);
            for(k=0;k < animals.length; k++){
                if(JSON.stringify(participant) === JSON.stringify(animals[k])){
                    animals.splice(animals.indexOf(animals[k]), 1);
                    localStorage.setItem('animals', JSON.stringify(animals)); 
                }
            }
            self.participants.remove(participant);
            console.log(this);
        };
    }

    //--- Inicialização do ViewModel
    ko.applyBindings(new MyViewModel());
});

//Passar dados para a prox pag web
// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Obtém a query string da URL
    const queryString = window.location.search;

    // Extrai os parâmetros
    const urlParams = new URLSearchParams(queryString);

    // Obtém o valor do parâmetro "nome"
    const nome = urlParams.get('nome');

    // Preenche o input com o valor do nome, se existir
    if (nome) {
        document.getElementById('nome').value = nome;
        console.log('Nome carregado:', nome);
    }
});

function send_data(obj){
    console.log(obj);
    sessionStorage.setItem('animal_data', JSON.stringify(obj));
    window.location.href = 'monitorizacao-admin.html';
}

