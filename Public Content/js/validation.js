function validation() {
    const pizzas = JSON.parse(localStorage.getItem("panier"));
    console.log(pizzas);
    
    const table = document.getElementById("validation");

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const tr = document.createElement("tr");
    const thead1 = document.createElement("th");
    const thead2 = document.createElement("th");
    const thead3 = document.createElement("th");
    const thead4 = document.createElement("th");
    const thead5 = document.createElement("th");
    const thead6 = document.createElement("th");

    thead1.textContent = "Nom de la pizza";
    thead2.textContent = "La taille de la pizza";
    thead3.textContent = "Le prix de la pizza";
    thead4.textContent = "les ingredients";
    thead5.textContent = "quantite";
    thead6.textContent = "Total";

    const list = [thead1, thead2, thead3, thead4, thead5, thead6];

    list.forEach((element)=> {tr.appendChild(element)});
    thead.appendChild(tr);

    pizzas.map((pizza) => {
        const trelemnt = document.createElement('tr');
        const td1 = document.createElement("td");
        td1.textContent = pizza.nom_pizza;

       
        const td2 = document.createElement("td");
        td2.textContent = pizza.taille;
        
        const td3 = document.createElement("td");
        td3.textContent = pizza.prix;
        
        const td4 = document.createElement("td");

        pizza.ingredients.forEach((ingredient,index) =>{
            const td5 = document.createElement("span");
            const isLastelement = index === pizza.ingredients.length - 1;
            td5.textContent = ingredient + (isLastelement ? "":", ");
            td4.appendChild(td5)
        });

        const td6 = document.createElement("td");
        td6.textContent = pizza.quantite;

        const td7 = document.createElement("td");
        td7.textContent = parseFloat(td3.textContent) * parseFloat(td6.textContent)+ " €";
        td7.id = "€"
 
        trelemnt.appendChild(td1);
        trelemnt.appendChild(td2);
        trelemnt.appendChild(td3);
        trelemnt.appendChild(td4);
        trelemnt.appendChild(td6);
        trelemnt.appendChild(td7);
        tbody.appendChild(trelemnt)
    });

    table.appendChild(thead);
    table.appendChild(tbody);
}


function finaliser() {
    const p = document.getElementById("p");
    const allcommands = document.querySelectorAll("[id^=€]");


    const span = document.createElement("span");
    let sommeTotal = 0

    allcommands.forEach((command)=>{
        let prix = parseFloat(command.innerHTML.split(" €")[0])
        sommeTotal += prix;
       
    });
    span.textContent = sommeTotal+" €";
    p.appendChild(span);
}

function divfinaliser() {
    const button = document.getElementById("id-button");
    const div = document.getElementById("div-validation");
    const span = document.createElement('span');
    span.className="span-validation"
    span.textContent = "Votre livraison de la commande prend un maximum de 2 jours!"

    button.addEventListener('click',()=>{
        button.disabled = true;
        const img = document.createElement('img');
        img.src = "http://localhost:8000//WebService//images/image.png";
        img.className="img-validation";
        img.title="the-pizza-delivery-man"
        div.appendChild(span);
        div.appendChild(img);
        localStorage.clear();
    });
    
}