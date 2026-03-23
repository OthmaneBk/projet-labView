let pizzasChargees = [];

function allpizza() {
    const grid = document.getElementById("pizza-div");
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];

    getAllpizzas().then(pizzas => {
        pizzasChargees = pizzas;
        pizzas.forEach(pizza => {
            const pizzaTrouver = panierStocke.find(item => item.id_pizza === pizza.id_pizza);
            const quantiteInitiale = pizzaTrouver ? pizzaTrouver.quantite : 0;

            const ingredientsList = Array.isArray(pizza.ingredients)
                ? pizza.ingredients
                : pizza.ingredients.split(",").map(i => i.trim());

            const ingredientsHTML = ingredientsList
                .map(i => `<li>${i}</li>`)
                .join("");

            const card = document.createElement("div");
            card.className = "pizza-card";
            card.innerHTML = `
                <div class="pizza-icon">🍕</div>
                <h3 class="pizza-name">${pizza.nom_pizza}</h3>
                <span class="pizza-size">${pizza.taille}</span>
                <span class="pizza-price">${pizza.prix.toFixed(2)} €</span>
                <div class="pizza-ingredients">
                    <p class="ingredients-label">Ingrédients</p>
                    <ul class="ingredients-list">${ingredientsHTML}</ul>
                </div>
                <div class="pizza-actions">
                    <button class="btn-moins">−</button>
                    <span class="pizza-quantite" id="span ${pizza.id_pizza}">${quantiteInitiale}</span>
                    <button class="btn-plus">+</button>
                </div>
            `;

            const btnPlus = card.querySelector(".btn-plus");
            const btnMoins = card.querySelector(".btn-moins");
            const spanQuantite = card.querySelector(".pizza-quantite");

            btnPlus.addEventListener('click', () => {
                spanQuantite.textContent = parseInt(spanQuantite.textContent) + 1;
                updateFooter();
            });

            btnMoins.addEventListener('click', () => {
                const q = parseInt(spanQuantite.textContent);
                if (q === 0) return;
                spanQuantite.textContent = q - 1;
                updateFooter();
            });

            grid.appendChild(card);
        });

        updateFooter();
    });
}

function updateFooter() {
    const allspan = document.querySelectorAll("[id^='span ']");
    let total = 0;
    allspan.forEach(span => { total += parseInt(span.textContent); });

    const footer = document.getElementById("footer");
    const cartCount = document.getElementById("cart-count");

    const badge = document.getElementById("header-cart-count");
    if (badge) badge.textContent = total;

    if (total > 0) {
        footer.style.display = "flex";
        cartCount.textContent = total + " pizza(s) sélectionnée(s)";
        localStorage.setItem('footer', 'flex');
    } else {
        footer.style.display = "none";
        localStorage.removeItem('footer');
    }
}
