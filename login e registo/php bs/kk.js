function send_date(data){
    dataToSend = "variableName=" + encodeURIComponent(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "marcar_consulta.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // Check if the request is complete
        if (xhr.status === 200) {
        // Check if the request was successful
        console.log(xhr.responseText);
        show_free_hours(xhr.responseText, data);
        // Output the response from the PHP script
        }else {
          console.error("Error:", xhr.status);
        }
      } 
    };
   xhr.send(dataToSend);
  }

  function show_free_hours(used_time, date){
    document.getElementById('hour_div').innerHTML = '<p> Horários disponíveis: </p>';
    unavailable_arr = used_time.split(' ');
    unavailable_arr.shift();
    console.log(unavailable_arr);
    hours = ['08:30', '09:30', '10:30', '11:30', '12:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30']

    for(k=0; k < hours.length; k++){
      hour_display_div = document.createElement('div');
      hour_display_div.classList.add('row', 'justify-content-start');

      hour_radio = document.createElement('span');
      hour_radio.innerHTML = '<input type="radio" name="time" value="' + hours[k] + ' ' + date + '" id="' + hours[k] + '">' + hours[k];
      hour_radio.value = hours[k];
      hour_radio.classList.add('mb-1', 'float-start');
      
      document.getElementById('hour_div').appendChild(hour_display_div);
      hour_display_div.appendChild(hour_radio);

      if(unavailable_arr.includes(hours[k]) && date[1] === unavailable_arr[2] && date[2] === unavailable_arr[3]){
        hour_radio.innerHTML = '<s>' + hour_radio.innerHTML + '</s>';
        document.getElementById(hours[k]).disabled = true;
      }
    }
  }
