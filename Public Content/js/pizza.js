
function allpizza() {
    const table = document.getElementById("pizza-div");

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    const tr = document.createElement("tr");
    const thead1 = document.createElement("th");
    const thead2 = document.createElement("th");
    const thead3 = document.createElement("th");
    const thead4 = document.createElement("th");
    const thead5 = document.createElement("th");

    thead1.textContent = "Nom de la pizza";
    thead2.textContent = "La taille de la pizza";
    thead3.textContent = "Le prix de la pizza";
    thead4.textContent = "les ingredients";
    thead5.textContent = "Actions";

    const list = [thead1, thead2, thead3, thead4, thead5];

    list.forEach((element)=> {tr.appendChild(element)});
    thead.appendChild(tr);
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];
    //console.log(panierStocke);
    

    getAllpizzas().then(pizzas =>{
        pizzas.map((pizza) => {

        //console.log(pizza);
        const trelemnt = document.createElement('tr');
        const td1 = document.createElement("td");
        td1.textContent = pizza.nom_pizza;

       
        const td2 = document.createElement("td");
        td2.textContent = pizza.taille;
        
        const td3 = document.createElement("td");
        td3.textContent = pizza.prix +" €";
        
        const td4 = document.createElement("td");

        pizza.ingredients.split(",").forEach((ingredient,index) =>{
            const td5 = document.createElement("span");
            const isLastelement = index === pizza.ingredients.length - 1;
            td5.textContent = ingredient + (isLastelement ? "":", ");
            td4.appendChild(td5)
        });


        const btnPlus = document.createElement("button");
        btnPlus.id = "plus";
        const btnMoins = document.createElement("button");
        btnMoins.id = "moins";

        btnPlus.textContent = "+";
        btnMoins.textContent = "-";

        const spanQuantite = document.createElement("span");
        const pizzaTrouver = panierStocke.find(item => {
            return item.id_pizza === pizza.id_pizza //=== -> comprasion || = -> affectation
        });
        
        spanQuantite.textContent =  pizzaTrouver ? pizzaTrouver.quantite : 0
        
        spanQuantite.id = "span "+pizza.id_pizza; 

        btnPlus.addEventListener('click', () => {

            spanQuantite.textContent = parseInt(spanQuantite.textContent) +1;
            const footer = document.getElementById("footer");
            footer.style.display = "inline";
            localStorage.setItem('footer',footer.style.display);
        })

        btnMoins.addEventListener('click', () => {
            let quantiteActuel = parseInt(spanQuantite.textContent);

            if (quantiteActuel === 0) {
                document.createElement(alert("ERROR"))
                return;
            }
            if (quantiteActuel>0){
                spanQuantite.textContent = quantiteActuel -1;
            }
            let allspan = document.querySelectorAll("[id^=span]");

            let totalPizza =0;
            allspan.forEach((span)=>{
                const qtePizza = parseInt(span.textContent)
                totalPizza += qtePizza
            });
            

           
            if (totalPizza==0){
                footer.style.display = "none";
            }

        })

        trelemnt.appendChild(td1);
        trelemnt.appendChild(td2);
        trelemnt.appendChild(td3);
        trelemnt.appendChild(td4);
        trelemnt.appendChild(btnPlus);
        trelemnt.appendChild(btnMoins);
        trelemnt.appendChild(spanQuantite);
        tbody.appendChild(trelemnt)
    });
    })
    

    table.appendChild(thead)
    table.appendChild(tbody);
}




function Footerdisplay() {
    const footer = document.getElementById("footer");
    footer.style.display = localStorage.getItem("footer");
}
