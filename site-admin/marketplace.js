$(document).ready(() => {
    function MyViewModel(){
        const self = this;
        self.participants = ko.observableArray();

        //Indica se a LISTA tem ou não elementos
        self.hasParticipants = ko.computed(function () {
            var retVal = (self.participants().length > 0);
            console.log('hasParticipants: ' + retVal);
            return retVal;
        }, self);

        self.create_participant = () => {
            const fr = new FileReader();
            const participant = {
                name: $('#product_name').val(),
                price: $('#product_price').val(),
                id: $('#product_id').val(),
                colaborator: $('#product_colaborator').val(),
                image: '' // Initialize image property
            };
        
            fr.onload = () => {
                // Set the image data to participant object
                participant.image = fr.result;
        
                // Save the updated participant object to localStorage
                let products = JSON.parse(localStorage.getItem('products')) || [];
                products.push(participant);
                localStorage.setItem('products', JSON.stringify(products));
                console.log(JSON.parse(localStorage.getItem('products')));
        
                // Add the participant to the observable array and sort
                self.participants.push(participant);
                self.participants.sort((left, right) =>
                    left.name === right.name ? 0 : (left.name < right.name ? -1 : 1)
                );
        
                // Close the modal
                $("#product_modal").modal('toggle');
            };
        
            // Read the image file
            const fileInput = document.getElementById('product_image');
            if (fileInput.files && fileInput.files[0]) {
                fr.readAsDataURL(fileInput.files[0]);
            } else {
                alert('Please select an image file.');
            }
        };
        

        self.readParticipants = function () {
            console.log('init');
            //--- carrega a lista com um conjunto de participantes
            for(i=0; i < JSON.parse(localStorage.getItem('products')).length; i++){
                self.participants.push(JSON.parse(localStorage.getItem('products'))[i])
            }
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
                function (left, right) {
                    return left.name === right.name ? 0 : (left.name < right.name ? -1 : 1)
                });
        };

        self.deleteParticipant = function (participant) {
            console.log('deleteParticipant');
            //--- apaga um participante da lista 
            let products = JSON.parse(localStorage.getItem('products'));
            console.log(participant);
            for(k=0;k < products.length; k++){
                if(JSON.stringify(participant) === JSON.stringify(products[k])){
                    products.splice(products.indexOf(products[k]), 1);
                    localStorage.setItem('products', JSON.stringify(products)); 
                }
            }
            self.participants.remove(participant);
            console.log(this);
        };
    }

        ko.applyBindings(new MyViewModel());
});