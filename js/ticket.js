var infantCount = document.getElementById("infant-tckt-count");
var childCount = document.getElementById("child-tckt-count");
var adultCount = document.getElementById("adult-tckt-count");
var foreignInfantCount = document.getElementById("foreign-infant-tckt-count");
var foreignChildCount = document.getElementById("foreign-child-tckt-count");
var foreignCount = document.getElementById("foreign-tckt-count");
var tcktsPrices = { infant : 0, child : 700, adult : 1200, foreignInfant : 0, foreignChild : 2700, foreign : 5500 };
var durationCost = { 3 : [0,0], 12 : [350,450], 24 : [600,800] };
var duration = 0;
var durationTotCost = 0;
var annualCount = document.getElementById("annual-pass-count");
var foodCount = document.getElementById("food-token-count");
var trains = ["Udarata Menike", "Senkadagala Menike","Yal Devi"];
var details = { };
var summary = [];
var date = new Date();
var tourDate;
var sectValid = { date : false, details : false, tckts : false };
var tcktCount = 0;

// Details Validator
document.querySelectorAll(".details .sect-content .input-cont").forEach( ele => {
    ele.querySelector("input").addEventListener("change", () => {
        if (ele.querySelector("input").value == "" || ele.querySelector("input").value == 0 || ele.querySelector("input").value == " "){
            ele.appendChild(document.createElement("p")).setAttribute("class", "error-msg");
            ele.querySelector(".error-msg").innerHTML = "Can't leave this empty";
        }else{
            if (ele.querySelector(".error-msg") != null){
                ele.removeChild(ele.querySelector(".error-msg"));
            }
        }
        detailsValidation();
    });
});

function detailsValidation() {
    if (document.querySelectorAll(".details .sect-content .error-msg").length < 1 && document.getElementById("name").value != "" && document.getElementById("phone").value != "" && document.getElementById("email").value != "" && document.getElementById("confirm-email").value != "" && document.getElementById("email").value == document.getElementById("confirm-email").value){
        document.getElementById("details-icon").innerHTML = `<ion-icon name="checkmark-circle-outline" class="green-check"></ion-icon>`;
        document.getElementById("confirm-details").disabled = false;
        sectValid.details = true;
    }else{
        document.getElementById("details-icon").innerHTML = `<ion-icon name="remove-circle-outline" class="grey-check"></ion-icon>`;
        document.getElementById("confirm-details").disabled = true;
        sectValid.details = false;
    }

}
function add_err_msg(eleName, error_msg){
    document.getElementById(eleName).parentElement.appendChild(document.createElement("p")).setAttribute("class", "error-msg");
    document.getElementById(eleName).parentElement.querySelector(".error-msg").innerHTML = error_msg;
}
function remove_err_msg(eleName){
    if (document.getElementById(eleName).parentElement.querySelector(".error-msg") != null){
        document.getElementById(eleName).parentElement.removeChild(document.getElementById(eleName).parentElement.querySelector(".error-msg"));
    }
}

function formatValidator(regex, value) {
    return regex.test(value);
}

document.getElementById("name").addEventListener("change", () => {
    document.getElementById("name").value != "" ? document.getElementById("name").value.length < 3 ? add_err_msg("name", "Name is too short") : remove_err_msg("name") : add_err_msg("name", "Can't leave this empty");
    detailsValidation();
});
document.getElementById("phone").addEventListener("change", () => {
    document.getElementById("phone").value != "" ? formatValidator(/^\+94 ?\d{3} ?\d{3} ?\d{3}$/, document.getElementById("phone").value) == false ? add_err_msg("phone", "Invalid contact number") : remove_err_msg("phone") : add_err_msg("phone", "Can't leave this empty");
    detailsValidation();
});
document.getElementById("email").addEventListener("change", () => {
    document.getElementById("email").value != "" ? formatValidator(/^\S+@\S+\.\S+$/, document.getElementById("email").value) == false ?  add_err_msg("email", "Invalid email") : remove_err_msg("email") : add_err_msg("email", "Can't leave this empty");
    document.getElementById("confirm-email").value != document.getElementById("email").value ? add_err_msg("confirm-email", "Emails don't match") : remove_err_msg("confirm-email");
    detailsValidation();
});
document.getElementById("confirm-email").addEventListener("change", () => {
    document.getElementById("confirm-email").value != "" ? document.getElementById("confirm-email").value != document.getElementById("email").value ? add_err_msg("confirm-email", "Emails don't match") : remove_err_msg("confirm-email") : add_err_msg("confirm-email", "Can't leave this empty");
    detailsValidation();
});

// Date
document.getElementById("date").setAttribute("min", new Date().toISOString().split("T")[0]);

document.getElementById("date").addEventListener("change", function() {
    if (document.getElementById("date").value != "") {
        document.getElementById("date-icon").innerHTML = `<ion-icon name="checkmark-circle-outline" class="green-check"></ion-icon>`;
        sectValid.date = true;
        tourDate = document.getElementById("date").value;
        displaySummary();
    }else{
        document.getElementById("date-icon").innerHTML = `<ion-icon name="remove-circle-outline" class="grey-check"></ion-icon>`;
        sectValid.date = false;
    }
});

// Ticket 
// Counter buttons
document.querySelectorAll(".tckt-input").forEach( ele => {
    ele.querySelector(".prev-btn").addEventListener("click", () => {
            if (parseInt(ele.querySelector("input").value) > 0){
            ele.querySelector("input").setAttribute("value", parseInt(ele.querySelector("input").value) - 1);
        }
    });
    ele.querySelector(".next-btn").addEventListener("click", () => {
        ele.querySelector("input").setAttribute("value", parseInt(ele.querySelector("input").value) + 1);
    });
});

// Ticket Validation
function totalDurationCost(durIndex) {
    return ((parseInt(childCount.value) * durationCost[durIndex][0])) + (parseInt(adultCount.value) * durationCost[durIndex][0]) + (parseInt(foreignChildCount.value) * durationCost[durIndex][1]) + (parseInt(foreignCount.value) * durationCost[durIndex][1]);
}

document.addEventListener("click", () => {
    document.getElementsByName("duration").forEach( ele => {
        if (ele.checked){
            if (parseInt(ele.value) == 3){
                duration = 3;
                durationTotCost = totalDurationCost(duration);
            } else if (parseInt(ele.value) == 12){
                duration = 12;
                durationTotCost = totalDurationCost(duration);
            } else if (parseInt(ele.value) == 24){
                duration = 24;
                durationTotCost = totalDurationCost(duration);
            }
        }
    });
    if ((parseInt(childCount.value) != 0 || parseInt(infantCount.value) != 0 || parseInt(adultCount.value) != 0 || parseInt(foreignInfantCount.value) != 0 || parseInt(foreignChildCount.value) != 0 || parseInt(foreignCount.value) != 0) && (duration != 0)){
        document.getElementById("tckt-icon").innerHTML = `<ion-icon name="checkmark-circle-outline" class="green-check"></ion-icon>`;
        sectValid.tckts = true;
        document.getElementById("add-fav").disabled = false;
    }else{
        document.getElementById("tckt-icon").innerHTML = `<ion-icon name="remove-circle-outline" class="grey-check"></ion-icon>`;
        sectValid.tckts = false;
        document.getElementById("add-fav").disabled = true;
    }

    // Ticket Total
    document.getElementById("total").innerHTML = `${(parseInt(childCount.value) * tcktsPrices.child) + (parseInt(adultCount.value) * tcktsPrices.adult) + (parseInt(foreignChildCount.value) * tcktsPrices.foreignChild) + (parseInt(foreignCount.value) * tcktsPrices.foreign) + durationTotCost}.00`;

    displayFavorite();
    displaySummary();


    //Remove Button
    document.querySelectorAll("#delete").forEach(ele =>{
        ele.addEventListener("click", function (){
            summary.splice(parseInt(ele.getAttribute("value")),1);
        });
    });

});

document.querySelector(".purchase").addEventListener("click", () => {
    setTimeout(() => {
        if (sectValid.date == true && sectValid.tckts == true && sectValid.details == true){
            document.getElementById("confirm").disabled = false;
        }else{
            document.getElementById("confirm").disabled = true;
        }
    }, 100);
});

//Reset Button
document.getElementById("reset").addEventListener("click", resetBtn);
    
function resetBtn(){
    infantCount.setAttribute("value",0);
    childCount.setAttribute("value",0);
    adultCount.setAttribute("value",0);
    foreignInfantCount.setAttribute("value",0);
    foreignChildCount.setAttribute("value",0);
    foreignCount.setAttribute("value",0);
    durationTotCost = 0;
    duration = 0;

    document.getElementsByName("duration").forEach( ele => {
        ele.checked = false;
    });
    
    sectValid.tckts = false;
}

//Confirm Button
document.getElementById("confirm").addEventListener("click", function (){
    let purchase = { };

    purchase["infantCount"] = ["Infant (Below 4 Yrs)",parseFloat(infantCount.value)];
    purchase["childCount"] = ["Child (4 Yrs - 13 Yrs)",parseFloat(childCount.value)];
    purchase["adultCount"] = ["Adult",parseFloat(adultCount.value)];
    purchase["foreignInfantCount"] = ["Foreign Infant",parseFloat(foreignInfantCount.value)];
    purchase["foreignChildCount"] = ["Foreign Child",parseFloat(foreignChildCount.value)];
    purchase["foreignCount"] = ["Foreign Adult",parseFloat(foreignCount.value)];
    purchase["duration"] = ["Duration",duration];

    details["name"] = ["Name",document.getElementById("name").value];
    details["email"] = ["Email",document.getElementById("email").value];
    details["phone"] = ["Phone",document.getElementById("phone").value];
    details["gender"] = ["Gender",document.getElementById("gender").value];

    tourDate = document.getElementById("date").value;

    summary.push(purchase);
    resetBtn();
});

//Loyalty Points Check
document.getElementById("lCheck").addEventListener("click", function (){
    document.querySelector(".modal-icon").innerHTML = `<ion-icon name="ribbon-outline" class="blue"></ion-icon>`;
    document.querySelector(".order-details").innerHTML = `
        <p>Loyalty Points : ${localStorage.getItem("loyalty_points") != null ? localStorage.getItem("loyalty_points") : "0"}</p>
        `
    document.querySelector(".modal-cont").style.display = "flex";
    document.body.style.overflow = "hidden";
});

//Place Order Button
document.getElementById("order").addEventListener("click", function (){
    if (Object.keys(details).length != 0 && tourDate != undefined){
        document.querySelector(".modal-icon").innerHTML = `<ion-icon name="checkmark-circle-outline" class="green-check"></ion-icon>`;
        document.querySelector(".order-details").innerHTML = `
            <p>Payment Successful</p>
            <p>Thank you for your purchase!</p>
            <p>Your order ID is #${Math.floor(Math.random()*1000000)+1000000}</p>
            `
        document.querySelector(".modal-cont").style.display = "flex";
        document.body.style.overflow = "hidden";
    }
    if (tcktCount > 3){
        localStorage.setItem("loyalty_points",parseInt(localStorage.getItem("loyalty_points")) + (tcktCount*15));
    }
    summary = [];
});

//Close Modal
document.getElementById("close").addEventListener("click", function (){
    document.body.style.overflow = "auto";
    document.querySelector(".modal-cont").style.display = "none";
    resetBtn();
});


// Favorite
document.getElementById("add-fav").addEventListener("click", function (){
    let fav = { };
    let purchase = { };
    
    purchase["infantCount"] = ["Infant (Below 4 Yrs)",parseFloat(infantCount.value)];
    purchase["childCount"] = ["Child (4 Yrs - 13 Yrs)",parseFloat(childCount.value)];
    purchase["adultCount"] = ["Adult",parseFloat(adultCount.value)];
    purchase["foreignInfantCount"] = ["Foreign Infant",parseFloat(foreignInfantCount.value)];
    purchase["foreignChildCount"] = ["Foreign Child",parseFloat(foreignChildCount.value)];
    purchase["foreignCount"] = ["Foreign Adult",parseFloat(foreignCount.value)];
    purchase["duration"] = ["Duration",duration];

    
    localStorage.setItem("fav", JSON.stringify(purchase));
    resetBtn();
});

document.getElementById("confirm-details").addEventListener("click", function (){
    details["name"] = ["Name",document.getElementById("name").value];
    details["email"] = ["Email",document.getElementById("email").value];
    details["phone"] = ["Phone",document.getElementById("phone").value];
    details["gender"] = ["Gender",document.getElementById("gender").value];
});

document.addEventListener("DOMContentLoaded", displayFavorite());

function displayFavorite() {
    //Favourite
    let fav_final = ``;
    if (localStorage.getItem("fav") == null){
        fav_final = `<p>No Favourites</p>`;
        document.getElementById("order-fav").style.display = "none";
    }else{
        let totalCost = 0;
        let purchase = ``;
        let fav = JSON.parse(localStorage.getItem("fav"));
        fav_final = `
        <p class="title"><span>Order</span><span>${fav["duration"][1]}Hrs</span></p>
        <table>
            <thead>
            <tr>
                    <td><div class="title-tckt"><p>Ticket</p></div></td>
                    <td><div class="title-qty"><p>Qty</p></div></td>
                    <td><div class="title-price"><p>Price</p></div></td>
                </tr>
            </thead>
            <tbody>`;
        
        let durationCostIndex = fav["duration"][1];
        Object.entries(fav).forEach( ele => {
            if (ele[1][1] != 0 && ele[0] != "duration"){
                    
                if (ele[0] == "infantCount"){
                    price = 0;
                }else if (ele[0] == "childCount"){
                    price = (ele[1][1] * tcktsPrices.child) + ((ele[1][1] * durationCost[durationCostIndex][0]));
                }else if (ele[0] == "adultCount"){
                    price = (ele[1][1] * tcktsPrices.adult) + ((ele[1][1] * durationCost[durationCostIndex][0]));
                }else if (ele[0] == "foreignInfantCount"){
                    price = 0;
                }else if (ele[0] == "foreignChildCount"){
                    price = (ele[1][1] * tcktsPrices.foreignChild) + ((ele[1][1] * durationCost[durationCostIndex][1]));
                }else if (ele[0] == "foreignCount"){
                    price = (ele[1][1] * tcktsPrices.foreign) + ((ele[1][1] * durationCost[durationCostIndex][1]));
                }

                totalCost += price;

                purchase += `
                <tr class="tckt">
                    <td><div class="name">${ele[1][0]}</div></td>
                    <td><div class="qty">${ele[1][1]}</div></td>
                    <td><div class="price">${price}</div></td>
                </tr>`
            } 
        });
        fav_final += purchase +`
            </tbody>
        </table>
        <p class="gTotal"><span class="tag">Grand Total</span><span>LKR ${totalCost}</span></p>
        `
        document.getElementById("order-fav").style.display = "block";
    }
    document.querySelector(".fav .purchase-summary").innerHTML = fav_final;
}

//Order Favourite
document.getElementById("order-fav").addEventListener("click", function (){
    let purchase = { };
    let fav = JSON.parse(localStorage.getItem("fav"));

    purchase["infantCount"] = ["Infant (Below 4 Yrs)",parseFloat(fav["infantCount"][1])];
    purchase["childCount"] = ["Child (4 Yrs - 13 Yrs)",parseFloat(fav["childCount"][1])];
    purchase["adultCount"] = ["Adult",parseFloat(fav["adultCount"][1])];
    purchase["foreignInfantCount"] = ["Foreign Infant",parseFloat(fav["foreignInfantCount"][1])];
    purchase["foreignChildCount"] = ["Foreign Child",parseFloat(fav["foreignChildCount"][1])];
    purchase["foreignCount"] = ["Foreign Adult",parseFloat(fav["foreignCount"][1])];
    purchase["duration"] = ["Duration",fav["duration"][1]];

    summary.push(purchase);
});

function displaySummary(){
    //Summary
    let grandTotal = 0;
    let content = ``;
    let final = ``;

    if (Object.keys(summary).length == 0){
        final = `<p>No Bookings</p>`
        document.getElementById("order").style.display = "none";
    }else{
        tcktCount = 0;
        for (let c = 0; c < Object.keys(summary).length; c++) {
            let purchase = ``;
            let totalCost = 0;
            let tckts = summary[c];
            

            content = `
            <div class="purchase-summary">
            <p class="title"><span><button type="button" class="delete" id="delete" value="${c}"><ion-icon name="trash-outline"></ion-icon></button>Booking ${c+1}</span><span>${tckts["duration"][1]}Hrs</span></p>
                <table>
                    <thead>
                    <tr>
                            <td><div class="title-tckt"><p>Ticket</p></div></td>
                            <td><div class="title-qty"><p>Qty</p></div></td>
                            <td><div class="title-price"><p>Price</p></div></td>
                        </tr>
                    </thead>
                    <tbody>`;
                    
            let durationCostIndex = tckts["duration"][1];

            Object.entries(tckts).forEach( ele =>{
                let price = 0;

                if (ele[1][1] != 0 && ele[0] != "duration"){
                    
                    if (ele[0] == "infantCount"){
                        price = 0;
                        tcktCount += ele[1][1];
                    }else if (ele[0] == "childCount"){
                        price = (ele[1][1] * tcktsPrices.child) + ((ele[1][1] * durationCost[durationCostIndex][0]));
                        tcktCount += ele[1][1];
                    }else if (ele[0] == "adultCount"){
                        price = (ele[1][1] * tcktsPrices.adult) + ((ele[1][1] * durationCost[durationCostIndex][0]));
                        tcktCount += ele[1][1];
                    }else if (ele[0] == "foreignInfantCount"){
                        price = 0;
                        tcktCount += ele[1][1];
                    }else if (ele[0] == "foreignChildCount"){
                        price = (ele[1][1] * tcktsPrices.foreignChild) + ((ele[1][1] * durationCost[durationCostIndex][1]));
                        tcktCount += ele[1][1];
                    }else if (ele[0] == "foreignCount"){
                        price = (ele[1][1] * tcktsPrices.foreign) + ((ele[1][1] * durationCost[durationCostIndex][1]));
                        tcktCount += ele[1][1];
                    }

                    totalCost += price;

                    purchase += `
                    <tr class="tckt">
                        <td><div class="name">${ele[1][0]}</div></td>
                        <td><div class="qty">${ele[1][1]}</div></td>
                        <td><div class="price">${price}</div></td>
                    </tr>`
                }
            });
    
            grandTotal += totalCost;
            content += purchase;
            content += `
                    </tbody>
                    <tfoot>
                        <td colspan="2"><div>Total</div></td>
                        <td><div>${totalCost}</div></td>
                        </tfoot>
                        </table>
            </div>
            `;
            final += content;
        };
        let title = '';


        if(Object.keys(details).length != 0){
            if (details["gender"][1] == "M"){ 
                title = "Mr";
            }else{
                title = "Ms";
            }
            final = `
            <div class="details-summary">
                <div class="guest-details">
                    <p class="name">${title}. ${details["name"][1]}</p>
                    <p class="email">${details["email"][1]}</p>
                    <p class="phone">${details["phone"][1]}</p>
                </div>
                <p class="date">${tourDate}</p>
            </div>` + 
            final + `
            <p class="gTotal"><span class="tag">Grand Total</span><span>LKR ${grandTotal}</span></p>
            `
        }else{
            final += `<p class="gTotal"><span class="tag">Grand Total</span><span>LKR ${grandTotal}</span></p>`
        }
        if (sectValid.date == true && sectValid.details == true){
            document.getElementById("order").disabled = false;
        }else{
            document.getElementById("order").disabled = true;
        }
        document.getElementById("order").style.display = "flex";
    }
    document.querySelector(".purchases").innerHTML = final;
}




//Styling JS
window.addEventListener("resize", function(){
    if (window.innerWidth < 600){
        document.querySelector(".price-table tbody").innerHTML = `
        <tr>
            <td class="type-label" colspan="4">Infant (Below 4Yrs)</td>
        </tr>
        <tr>
            <td class="type">Infant (Below 4Yrs)</td>
            <td colspan="3">Free</td>
        </tr>
        <tr>
            <td class="label" colspan="4">Local Pass</td>
        </tr>
        <tr>
            <td class="type-label" colspan="4">Child (4Yrs - 13Yrs)</td>
        </tr>
        <tr>
            <td class="type">Child (4Yrs - 13Yrs)</td>
            <td>LKR 700</td>
            <td>LKR 1050</td>
            <td>LKR 1300</td>
        </tr>
        <tr>
            <td class="type-label" colspan="4">Adult</td>
        </tr>
        <tr>
            <td class="type">Adult</td>
            <td>LKR 1200</td>
            <td>LKR 1550</td>
            <td>LKR 1800</td>
        </tr>
        <tr>
            <td class="label" colspan="4">Foreign Pass</td>
        </tr>
        <tr>
            <td class="type-label" colspan="4">Child (4Yrs - 13Yrs)</td>
        </tr>
        <tr>
            <td class="type">Child (4Yrs - 13Yrs)</td>
            <td>LKR 2700</td>
            <td>LKR 3150</td>
            <td>LKR 3500</td>
        </tr>
        <tr>
            <td class="type-label" colspan="4">Adult</td>
        </tr>
        <tr>
            <td class="type">Adult</td>
            <td>LKR 5500</td>
            <td>LKR 5950</td>
            <td>LKR 6300</td>
        </tr>
        `
    }else{
        document.querySelector(".price-table tbody").innerHTML = `
        <tr>
            <td class="type">Infant (Below 4Yrs)</td>
            <td colspan="3">Free</td>
        </tr>
        <tr>
            <td class="label" colspan="4">Local Pass</td>
        </tr>
        <tr>
            <td class="type">Child (4Yrs - 13Yrs)</td>
            <td>LKR 700</td>
            <td>LKR 1050</td>
            <td>LKR 1300</td>
        </tr>
        <tr>
            <td class="type">Adult</td>
            <td>LKR 1200</td>
            <td>LKR 1550</td>
            <td>LKR 1800</td>
        </tr>
        <tr>
            <td class="label" colspan="4">Foreign Pass</td>
        </tr>
        <tr>
            <td class="type">Child (4Yrs - 13Yrs)</td>
            <td>LKR 2700</td>
            <td>LKR 3150</td>
            <td>LKR 3500</td>
        </tr>
        <tr>
            <td class="type">Adult</td>
            <td>LKR 5500</td>
            <td>LKR 5950</td>
            <td>LKR 6300</td>
        </tr>
        `
    }
});