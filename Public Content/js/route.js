// ================================================================
// COUCHE API — c'est le seul fichier à modifier pour l'intégration
// Remplacer chaque fonction mock par un vrai fetch() vers LabVIEW
// ================================================================

const API_URL = "http://localhost:8000/";

// GET /pizzas — retourne la liste des pizzas
async function getAllpizzas() {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "pizzas");
    // return await response.json();
    return Promise.resolve(PIZZAS_MOCK);
}

// POST /commande — envoie la commande au backend
async function posterCommande(panier) {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "commande", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(panier)
    // });
    // return await response.json();
    console.log("Commande envoyée (mock) :", panier);
    return Promise.resolve({ success: true, id_commande: Date.now() });
}

// GET /commande/:id — retourne le statut d'une commande
async function getStatutCommande(id_commande) {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "commande/" + id_commande);
    // return await response.json();
    return Promise.resolve({ id_commande, statut: "En préparation" });
}
