const hours = ['08:30', '09:30', '10:30', '11:30', '12:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30'];

$(document).ready(function (){
    let user = localStorage.getItem('user');
    if(localStorage.user){
      document.getElementById("nav-login").innerHTML = '<a class="nav-link" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDark-User" aria-controls="offcanvasDark">' + user + '</a>';
    }
    window.onmessage = (event) => {
      console.log(event.data);
      get_free_time(event.data);
    };
  });

function remove_other(){
    if(!document.getElementById('outro_radio').checked && !document.getElementById('outro_def').classList.contains('d-none')){
      document.getElementById('outro_def').parentElement.classList.add('d-none');
    }
}

function other_display(obj){
    if(obj.checked){
      document.getElementById('outro_def').parentElement.classList.remove('d-none');
    }
}

// Cria uma nova consulta
function create_obj(date){
    const appointment = new Object();
        appointment.user = localStorage.getItem('user');
        var radios = document.getElementsByName('flexRadioDefault');
        for(k=0; k < radios.length; k++){
            if(radios[k].checked){ appointment.reason = radios[k].value; break;}
        }
        var time_opt = document.getElementsByName('time');
        for(k=0; k < time_opt.length; k++){
            if(time_opt[k].checked){ appointment.time = time_opt[k].value; break;}
        }
        var date_time = appointment.time.split(' ');
        appointment.time = date_time[0];
        appointment.date = date_time[1].split(',');
        appointment.dog = document.getElementById('name_animal').value;

    var new_appointement = JSON.parse(sessionStorage.getItem('appointments')) || [];
    new_appointement.push(appointment);
    sessionStorage.setItem('appointments', JSON.stringify(new_appointement));
    console.log(sessionStorage.getItem('appointments'));
}

function get_free_time(date){
    document.getElementById('hour_div').innerHTML = '<p> Horários disponíveis: </p>';
    const appointments = JSON.parse(sessionStorage.getItem('appointments')) || [];
    console.log(appointments);

    for(k=0; k < hours.length; k++){
        //Row para o botão
        hour_display_div = document.createElement('div');
        hour_display_div.classList.add('row', 'justify-content-start');

        //Botão
        hour_radio = document.createElement('span');
        hour_radio.innerHTML = '<input type="radio" name="time" value="' + hours[k] + ' ' + date + '" id="' + hours[k] + '">' + hours[k];
        hour_radio.value = hours[k];
        hour_radio.classList.add('mb-1', 'float-start');
        
        document.getElementById('hour_div').appendChild(hour_display_div);
        hour_display_div.appendChild(hour_radio);

        //Mandar desativar se horas indisponíveis
        for(i=0; i < appointments.length; i++){
            if(appointments[i].date[0] === date[0] && appointments[i].date[1] === String(date[1]) && appointments[i].date[2] === String(date[2]) && appointments[i].time === hours[k]){
                hour_radio.innerHTML = '<s>' + hour_radio.innerHTML + '</s>';
                document.getElementById(hours[k]).disabled = true;
            }
        }
    }
}

function log_out(){
    localStorage.removeItem('user');
    window.location.reload();
} 
