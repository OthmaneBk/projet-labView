function sauvegarderEtRediriger() {
    let panier = [];
    let allspan = document.querySelectorAll("[id^=span]");

    allspan.forEach((span) => {
        const qtePizza = parseInt(span.textContent);
        if (qtePizza > 0) {
            const idPizza = parseInt(span.id.split(" ")[1]);
            const PizzaObjet = pizzasChargees.find(pizza => pizza.id_pizza === idPizza);
            if (PizzaObjet) {
                panier.push({ ...PizzaObjet, quantite: qtePizza });
            }
        }
    });

    localStorage.setItem('panier', JSON.stringify(panier));
    document.location.href = "validation.html";
}

function commande() {
    const commandeButton = document.getElementById("button-commander");
    commandeButton.addEventListener('click', sauvegarderEtRediriger);
}
