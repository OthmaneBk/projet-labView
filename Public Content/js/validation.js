function afficherCommande() {
    const pizzas = JSON.parse(localStorage.getItem("panier")) || [];

    if (pizzas.length === 0) {
        window.location.href = "home.html";
        return;
    }

    const badge = document.getElementById("header-cart-count");
    const totalPizzas = pizzas.reduce((sum, p) => sum + p.quantite, 0);
    if (badge) badge.textContent = totalPizzas;

    const tbody = document.getElementById("tbody-commande");
    let total = 0;

    pizzas.forEach(pizza => {
        const sousTotal = pizza.prix * pizza.quantite;
        total += sousTotal;

        const ingredients = Array.isArray(pizza.ingredients)
            ? pizza.ingredients.join(", ")
            : pizza.ingredients;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-nom">${pizza.nom_pizza}</td>
            <td>${pizza.taille}</td>
            <td>${pizza.prix.toFixed(2)} €</td>
            <td class="td-ingredients">${ingredients}</td>
            <td class="td-qte">${pizza.quantite}</td>
            <td class="td-total">${sousTotal.toFixed(2)} €</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("total-prix").textContent = total.toFixed(2) + " €";

    document.getElementById("btn-finaliser").addEventListener("click", async () => {
        const btn = document.getElementById("btn-finaliser");
        btn.disabled = true;
        btn.textContent = "Envoi en cours...";

        const result = await posterCommande(pizzas);

        btn.textContent = "Commande envoyée !";
        if (result.id_commande) {
            document.getElementById("id-commande").textContent = "#" + result.id_commande;
        }
        document.getElementById("confirmation").classList.remove("hidden");
        document.querySelector(".commande-section").classList.add("hidden");
        localStorage.clear();
    });
}
