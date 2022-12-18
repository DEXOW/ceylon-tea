let error_arry = new Array(6).fill(true); // [name, address, card-number, name-card, exp-date, cvv]

function add_err_msg(eleName, error_msg){
    document.getElementById(eleName).parentElement.appendChild(document.createElement("p")).setAttribute("class", "error-msg");
    document.getElementById(eleName).parentElement.querySelector(".error-msg").innerHTML = error_msg;
}
function remove_err_msg(eleName){
    if (document.getElementById(eleName).parentElement.querySelector(".error-msg") != null){
        document.getElementById(eleName).parentElement.removeChild(document.getElementById(eleName).parentElement.querySelector(".error-msg"));
    }
}

// Full Name
document.getElementById("name").addEventListener("input", function() {
    let value = this.value;
    value = value.replace(/[^a-zA-Z ]/g, "");
    this.value = value;
});
document.getElementById("name").addEventListener("change", function() {
    if (document.getElementById("name").value.length == 0){
        add_err_msg("name", "Please enter your name");
        error_arry[0] = true;
    }else if(document.getElementById("name").value.length < 3){
        add_err_msg("name", "Please enter a valid name");
        error_arry[0] = true;
    }else{
        remove_err_msg("name");
        error_arry[0] = false;
    }
});

// Address
document.getElementById("address").addEventListener("change", function() {
    if (document.getElementById("address").value.length == 0){
        add_err_msg("address", "Please enter your address");
        error_arry[1] = true;
    }else if(document.getElementById("address").value.length < 5){
        add_err_msg("address", "Please enter a valid address");
        error_arry[1] = true;
    }else{
        remove_err_msg("address");
        error_arry[1] = false;
    }
});

// Card Number
document.getElementById("card-number").addEventListener('input', function() {
    let value = this.value;
    if (value.length < 16) { 
        value = value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
        this.value = value;
    }
});
document.getElementById("card-number").addEventListener("change", function() {
    if (document.getElementById("card-number").value.length == 0){
        add_err_msg("card-number", "Please enter your card number");
        error_arry[2] = true;
    }else if(document.getElementById("card-number").value.length < 16){
        add_err_msg("card-number", "Card number must be 16 digits");
        error_arry[2] = true;
    }else{
        remove_err_msg("card-number");
        error_arry[2] = false;
    }
});

// Name on Card
document.getElementById("name-card").addEventListener("input", function() {
    let value = this.value;
    value = value.replace(/[^a-zA-Z ]/g, "");
    this.value = value;
});
document.getElementById("name-card").addEventListener("change", function() {
    if (document.getElementById("name-card").value.length == 0){
        add_err_msg("name-card", "Please enter the name on your card");
        error_arry[3] = true;
    }else{
        remove_err_msg("name-card");
        error_arry[3] = false;
    }
});

// Expiration Date
document.getElementById("exp-date").addEventListener('input', function() {
    let value = this.value;
    if (value.length < 4) { 
        value = value.replace(/[^\d]/g, '').replace(/(.{2})/g, '$1/').trim();
        this.value = value;
    }
});
document.getElementById("exp-date").addEventListener('keydown', function(event) {
    let value = this.value;
    if (event.key === 'Delete' || event.key === 'Backspace') {
        value = value.substring(0, value.length - 1);
        this.value = value;
    }
});
document.getElementById("exp-date").addEventListener("change", function() {

    if (document.getElementById("exp-date").value.length == 0){
        add_err_msg("exp-date", "Can't be empty");
        error_arry[4] = true;
    }else if(document.getElementById("exp-date").value.length < 5){
        add_err_msg("exp-date", "Invalid date");
        error_arry[4] = true;
    }else if (new Date(new Date(`${document.getElementById("exp-date").value.substring(0,2)}/01/${document.getElementById("exp-date").value.substring(3,5)}`)) == "Invalid Date"){
        add_err_msg("exp-date", "Invalid date");
        error_arry[4] = true;
    }else if (new Date(new Date(`${document.getElementById("exp-date").value.substring(0,2)}/01/${document.getElementById("exp-date").value.substring(3,5)}`)) < new Date()){
        add_err_msg("exp-date", "Expired card");
        error_arry[4] = true;
    }else{
        remove_err_msg("exp-date");
        error_arry[4] = false;
    }
});

// CVV
document.getElementById("cvv").addEventListener('input', function() {
    let value = this.value;
    value = value.replace(/[^\d]/g, '').trim();
    this.value = value;
});
document.getElementById("cvv").addEventListener("change", function() {
    if (document.getElementById("cvv").value.length == 0){
        add_err_msg("cvv", "Can't be empty");
        error_arry[5] = true;
    }else if(document.getElementById("cvv").value.length < 3){
        add_err_msg("cvv", "Invalid CVV");
        error_arry[5] = true;
    }else{
        remove_err_msg("cvv");
        error_arry[5] = false;
    }
});


document.addEventListener("click", function(){
    let amt = 0;

    document.getElementsByName("amount").forEach( ele => {
        if (ele.checked){
            amt = parseInt(ele.value);
        }
    });
    
    if (error_arry.includes(true) || amt === 0){
        document.getElementById("confirm-details").disabled = true;
    }else{
        document.getElementById("confirm-details").disabled = false;
    }
})


//Place Order Button
document.getElementById("confirm-details").addEventListener("click", function (){
    document.querySelector(".modal-icon").innerHTML = `<ion-icon name="checkmark-circle-outline" class="green-check"></ion-icon>`;
    document.querySelector(".order-details").innerHTML = `
        <p>Successfully Donated</p>
        <p>Thank you for your kind donation!</p>
        `
    document.querySelector(".modal-cont").style.display = "flex";
    document.body.style.overflow = "hidden";
});

//Close Modal
document.getElementById("close").addEventListener("click", function (){
    document.body.style.overflow = "auto";
    document.querySelector(".modal-cont").style.display = "none";
    resetBtn();
});

function resetBtn(){
    document.getElementById("donation-form").reset();
    error_arry.fill(true);
}