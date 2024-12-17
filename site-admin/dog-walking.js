window.onload = () => {
    
    function MyViewModel(){
        const self = this;

        self.participants = ko.observableArray();
        //Verifica se a LISTA tem elementos
        self.hasParticipants = ko.computed(function () {
            var retVal = (self.participants.length > 0);
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
                $("#walker_modal").modal('toggle');
            };
            const fileInput = document.getElementById('image');
            if (fileInput.files && fileInput.files[0]) {
                fr.readAsDataURL(fileInput.files[0]);
            } else {
                alert('Please select an image file.');
            }
            console.log(participant);  

        };

        self.read_participants = () => {
            console.log('Inicializing');
            const walkers = JSON.parse(localStorage.getItem('walkers'));
            console.log(walkers);

            //Carrega a LISTA com todos os participantes
            for(i=0; i < JSON.parse(localStorage.getItem('walkers')).length; i++){
                self.participants.push(JSON.parse(localStorage.getItem('walkers'))[i])
            }
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
            function (left, right) {
                return left.name === right.name ? 0 : (left.name < right.name ? -1 : 1)
            });
        };

        self.delete_participant = (participant) => {
            let walkers = JSON.parse(localStorage.getItem('walkers'));
            for(i=0;i < walkers.length; i++){
                if(JSON.stringify(participant) === JSON.stringify(walkers[i])){
                    walkers.splice(walkers.indexOf(walkers[i]), 1);
                    localStorage.setItem('walkers', walkers);
                }
            }
            self.participants.remove(participant);
            console.log(this);
        };
    }
    ko.applyBindings(new MyViewModel());
};