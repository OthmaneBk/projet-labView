// ----------------------------------------------------------------
// AUTH — gestion de la session utilisateur
// ----------------------------------------------------------------

function getUtilisateur() {
    try {
        return JSON.parse(localStorage.getItem("utilisateur"));
    } catch (e) {
        return null;
    }
}

function estConnecte() {
    return getUtilisateur() !== null;
}

function sauvegarderSession(utilisateur) {
    localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
}

function deconnecter() {
    localStorage.removeItem("utilisateur");
    window.location.href = "login.html";
}

// Affiche le nom de l'utilisateur dans le header si connecté
function afficherUtilisateurHeader() {
    const user = getUtilisateur();
    const navLogin = document.getElementById("nav-login");
    const navLogout = document.getElementById("nav-logout");
    const headerUser = document.getElementById("header-user");

    if (user) {
        if (navLogin) navLogin.style.display = "none";
        if (navLogout) navLogout.style.display = "inline-block";
        const affichage = user.prenom ? user.prenom : user.nom;
        if (headerUser) headerUser.textContent = "Bonjour, " + affichage;
    } else {
        if (navLogin) navLogin.style.display = "inline-block";
        if (navLogout) navLogout.style.display = "none";
        if (headerUser) headerUser.textContent = "";
    }
}

// Appelé au chargement de login.html
function initLogin() {
    if (estConnecte()) {
        window.location.href = "home.html";
        return;
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
        afficherSucces("Compte créé avec succès ! Connectez-vous.");
    }
}

// Appelé au chargement de register.html
function initRegister() {
    if (estConnecte()) {
        window.location.href = "home.html";
    }
}

// ----------------------------------------------------------------
// LOGIN
// ----------------------------------------------------------------

async function handleLogin(e) {
    e.preventDefault();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const btn      = e.target.querySelector("button[type=submit]");

    cacherErreur();
    cacherSucces();
    btn.disabled = true;

    try {
        const result = await login(email, password);

        if (result.success) {
            sauvegarderSession(result.utilisateur);
            const panier = JSON.parse(localStorage.getItem("panier")) || [];
            window.location.href = panier.length > 0 ? "validation.html" : "home.html";
        } else {
            afficherErreur(result.message || "Email ou mot de passe incorrect");
        }
    } catch (err) {
        afficherErreur("Impossible de contacter le serveur. Réessayez.");
    } finally {
        btn.disabled = false;
    }
}

// ----------------------------------------------------------------
// REGISTER
// ----------------------------------------------------------------

async function handleRegister(e) {
    e.preventDefault();
    const nom       = document.getElementById("nom").value.trim();
    const prenom    = document.getElementById("prenom").value.trim();
    const email     = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const adresse   = document.getElementById("adresse").value.trim();
    const password  = document.getElementById("password").value;
    const confirm   = document.getElementById("confirm").value;
    const btn       = e.target.querySelector("button[type=submit]");

    cacherErreur();

    if (password !== confirm) {
        afficherErreur("Les mots de passe ne correspondent pas");
        return;
    }

    btn.disabled = true;

    try {
        const result = await register(nom, prenom, email, password, telephone, adresse);

        if (result.success) {
            window.location.href = "login.html?registered=1";
        } else {
            afficherErreur(result.message || "Erreur lors de l'inscription");
        }
    } catch (err) {
        afficherErreur("Impossible de contacter le serveur. Réessayez.");
    } finally {
        btn.disabled = false;
    }
}

// ----------------------------------------------------------------
// HELPERS UI
// ----------------------------------------------------------------

function afficherErreur(message) {
    cacherSucces();
    const el = document.getElementById("error-msg");
    if (!el) return;
    el.textContent = message;
    el.classList.remove("hidden");
}

function cacherErreur() {
    const el = document.getElementById("error-msg");
    if (!el) return;
    el.classList.add("hidden");
}

function afficherSucces(message) {
    cacherErreur();
    const el = document.getElementById("success-msg");
    if (!el) return;
    el.textContent = message;
    el.classList.remove("hidden");
}

function cacherSucces() {
    const el = document.getElementById("success-msg");
    if (!el) return;
    el.classList.add("hidden");
}
