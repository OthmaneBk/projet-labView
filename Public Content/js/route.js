// ================================================================
// COUCHE API — c'est le seul fichier à modifier pour l'intégration
// Remplacer chaque fonction mock par un vrai fetch() vers LabVIEW
// ================================================================

const API_URL = "http://localhost:8000/";

// ----------------------------------------------------------------
// PIZZAS
// ----------------------------------------------------------------

// GET /pizzas — retourne la liste des pizzas
async function getAllpizzas() {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "pizzas");
    // return await response.json();
    return Promise.resolve(PIZZAS_MOCK);
}

// ----------------------------------------------------------------
// COMMANDES
// ----------------------------------------------------------------

// POST /commande — envoie la commande au backend
// Retourne : { success: true, id_commande: number }
async function posterCommande(panier) {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "commande", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(panier)
    // });
    // return await response.json();
    console.log("Commande envoyée (mock) :", panier);
    return Promise.resolve({ success: true, id_commande: Math.floor(Math.random() * 9000) + 1000 });
}

// GET /commande/:id — retourne le statut d'une commande
// Retourne : { id_commande, statut: "Attente" | "Préparation" | "Cuisson" | "Terminé" }
async function getStatutCommande(id_commande) {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "commande/" + id_commande);
    // return await response.json();
    return Promise.resolve({ id_commande, statut: "En préparation" });
}

// ----------------------------------------------------------------
// AUTHENTIFICATION
// ----------------------------------------------------------------

// POST /login — connecte l'utilisateur
// Retourne : { success: true, utilisateur: { nom, email, token } }
//          | { success: false, message: string }
async function login(email, password) {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password })
    // });
    // return await response.json();
    if (email && password) {
        const nom = email.split("@")[0];
        return Promise.resolve({
            success: true,
            utilisateur: { nom, email, token: "mock-token-" + Date.now() }
        });
    }
    return Promise.resolve({ success: false, message: "Email ou mot de passe incorrect" });
}

// POST /register — inscrit un nouvel utilisateur
// Retourne : { success: true }
//          | { success: false, message: string }
async function register(nom, email, password) {
    // TODO: remplacer par :
    // const response = await fetch(API_URL + "register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ nom, email, password })
    // });
    // return await response.json();
    if (nom && email && password) {
        return Promise.resolve({ success: true });
    }
    return Promise.resolve({ success: false, message: "Tous les champs sont obligatoires" });
}
