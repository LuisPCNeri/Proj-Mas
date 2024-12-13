

function change_validation(element){
    if(element.classList.contains("is-valid")){
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
    }else if(element.classList.contains("is-invalid")){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    }else if(!element.classList.contains("is-invalid") && !element.classList.contains("is-valid")){
        element.classList.add("is-invalid");
    }
}

function change_feedback(err_element){
    if(err_element.classList.contains("d-none")){
        err_element.classList.remove("d-none");
    }else{
        err_element.classList.add("d-none");
    }
}


function valida(){

    val = true;

    var rep_password = document.getElementById("password_re");
    var password = document.getElementById("new_password");
    var email = document.getElementById("email_insert");
    var phone = document.getElementById("phone");

    /*Itera por todos os campos com a class form-control e se nn tiver 3 caracteres esse campo fica invalido
    Se trocarem alguma coisa no html tenham em conta este loop*/
    var all_ele = document.getElementsByClassName("form-control");
    var all_feedback = document.getElementsByClassName("d-none");
    for(i = 0; i < all_ele.length; i++){
        if(all_ele[i].value.length < 3){
            val = false;
            if(!all_ele[i].classList.contains("is-invalid")){
                change_validation(all_ele[i]);
                //Precisa de uma mudança de feedback
                //Pode ser feito com o mesmo i mas para todos os elementos com d-none
            }
        }else if(all_ele[i].value.length >= 3 && all_ele[i].classList.contains("is-invalid")){change_validation(all_ele[i]);}
        else{all_ele[i].classList.add("is-valid");}
    }

    //Invalida o email se nn tiver um @
    if(!email.value.includes("@") && !email.classList.contains("is-invalid")){
        val = false;
        change_validation(email);
    }else if(email.classList.contains("is-invalid") && email.value.includes("@")){ change_validation(email);}

    //Invalida o campo para repetir a pass se este for diferente da pass
    if(password.value != rep_password.value){
        val = false
        e = document.getElementById("pass_re_err");
        if(!rep_password.classList.contains("is-invalid")){
            change_validation(rep_password);
            change_feedback(e);
        }
    }

    //Invalida o n de telemovel se tiver menos de 9 digitos
    if(phone.value.length < 9 && !phone.classList.contains("is-invalid")){
        val = false
        change_validation(phone);
    }else if(phone.value.length > 9 && phone.classList.contains("is-invalid")){
        change_validation(phone);
    }

    if(val){create_acc();}

    return val;
}

function create_acc(){
    const user = new Object();
    user.email = document.getElementById("email_insert").value;
    user.password = document.getElementById("new_password").value;
    user.addr = document.getElementById('address').value;
    user.name = document.getElementById('first_name').value + ' ' + document.getElementById('last_name').value;
    user.phone = document.getElementById("phone").value;
    console.log(user.email);

    if(user.email.includes('@vetria')){ user.id = 1;}
    console.log(user);

    new_user = JSON.parse(sessionStorage.getItem('user')) || [];

    if(new_user.find( u => u.email === user.email)){
        alert('no');
        return;
    }

    new_user.push(user);
    sessionStorage.setItem('user', JSON.stringify(new_user));
    console.log(sessionStorage.getItem('user'));
    window.location.href = 'log_in.html';
}