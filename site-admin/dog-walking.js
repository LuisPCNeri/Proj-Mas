window.onload = () => {
    
    function MyViewModel(){
        const self = this;

        self.participants = ko.observable();
        //Verifica se a LISTA tem elementos
        self.hasParticipants = ko.computed(function () {
            var retVal = (self.participants().length > 0);
            console.log('hasParticipants: ' + retVal);
            return retVal;
        }, self);

        //Atualiza a LISTA e o STORAGE com os participantes criados
        self.create_participant = () => {
            console.log('adding participant');

            const fr = new FileReader();
            const participant = {
                'name': $('#name').val(),
                'phone': $('#phone').val(),
                'rating': '',
                'description': $('#description').val(),
                'price': $('#price').val(),
                'image': ''
            };

            fr.onload = () => {
                participant.image = fr.result;
                let walkers = JSON.parse(localStorage.getItem('walkers')) || [];

                walkers.push(participant);
                localStorage.setItem('walkers', JSON.stringify(walkers));
                console.log(JSON.parse(localStorage.getItem('walkers')));

                self.participants.push(participant);
                self.participants.sort((left, right) =>
                    left.name === right.name ? 0 : (left.name < right.name ? -1 : 1)
                );
        
                // Close the modal
                $("#product_modal").modal('toggle');
            };

        };

        self.read_participants = () => {
            console.log('Inicializing');
            const participants = JSON.parse(localStorage.getItem('walkers'));

            //Carrega a LISTA com todos os participantes
            for(i=0; i < participants.length; i++){

            }
        };
    }
};