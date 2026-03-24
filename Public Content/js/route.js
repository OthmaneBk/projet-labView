// ================================================================
// COUCHE API — c'est le seul fichier à modifier pour l'intégration
// Remplacer chaque fonction mock par un vrai fetch() vers LabVIEW
// ================================================================

const API_URL = "http://localhost:8000/";

// ----------------------------------------------------------------
// PIZZAS
// ----------------------------------------------------------------

// GET /pizzas
// Retourne :
// [{ id_pizza, nom_pizza, taille, prix, ingredients: [string] }]
async function getAllpizzas() {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "pizzas");
    // return await response.json();
    return Promise.resolve(PIZZAS_MOCK);
}

// ----------------------------------------------------------------
// COMMANDES
// ----------------------------------------------------------------

// POST /commande
// Envoie :
// {
//   id_client : int,
//   total     : float,
//   lignes    : [{ id_pizza: int, quantite: int }]
// }
// Retourne : { success: true, id_commande: int }
async function posterCommande(panier) {
    const user = getUtilisateur();
    const total = panier.reduce((sum, p) => sum + p.prix * p.quantite, 0);

    const payload = {
        id_client : user ? user.id_client : null,
        total     : parseFloat(total.toFixed(2)),
        lignes    : panier.map(p => ({ id_pizza: p.id_pizza, quantite: p.quantite }))
    };

    // TODO: remplacer par :
    // const response = await fetch(API_URL + "commande", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload)
    // });
    // return await response.json();
    console.log("Commande envoyée (mock) :", payload);
    return Promise.resolve({ success: true, id_commande: Math.floor(Math.random() * 9000) + 1000 });
}

// GET /commande/:id
// Retourne :
// { id_commande, statut: "nouvelle" | "en cours" | "livrée" | "annulée" }
async function getStatutCommande(id_commande) {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "commande/" + id_commande);
    // return await response.json();
    return Promise.resolve({ id_commande, statut: "nouvelle" });
}

// ----------------------------------------------------------------
// AUTHENTIFICATION
// ----------------------------------------------------------------

// POST /login
// Envoie  : { email, password }
// Retourne si succès :
// { success: true, utilisateur: { id_client, nom, prenom, email, telephone, adresse, token } }
// Retourne si échec :
// { success: false, message: string }
async function login(email, password) {
    const response = await fetch("http://172.20.10.3:8000/clients/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return await response.json();
}

// POST /register
// Envoie  : { nom, prenom, email, password, telephone, adresse }
// Retourne si succès : { success: true }
// Retourne si échec  : { success: false, message: string }
async function register(nom, prenom, email, password, telephone, adresse) {
    const response = await fetch("http://172.20.10.3:8000/clients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, telephone, email, adresse, password })
    });
    return await response.json();
}
