// ----------------------------------------------------------------
// AUTH — gestion de la session utilisateur
// ----------------------------------------------------------------

function getUtilisateur() {
    return JSON.parse(localStorage.getItem("utilisateur"));
}

function estConnecte() {
    return getUtilisateur() !== null;
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
        if (headerUser) headerUser.textContent = "Bonjour, " + user.nom;
    } else {
        if (navLogin) navLogin.style.display = "inline-block";
        if (navLogout) navLogout.style.display = "none";
        if (headerUser) headerUser.textContent = "";
    }
}

// Appelé au chargement de login.html
function initLogin() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
        afficherSucces("Compte créé avec succès ! Connectez-vous.");
    }
}

// ----------------------------------------------------------------
// LOGIN
// ----------------------------------------------------------------

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    cacherErreur();

    const result = await login(email, password);

    if (result.success) {
        localStorage.setItem("utilisateur", JSON.stringify(result.utilisateur));
        const panier = JSON.parse(localStorage.getItem("panier")) || [];
        window.location.href = panier.length > 0 ? "validation.html" : "home.html";
    } else {
        afficherErreur(result.message || "Email ou mot de passe incorrect");
    }
}

// ----------------------------------------------------------------
// REGISTER
// ----------------------------------------------------------------

async function handleRegister(e) {
    e.preventDefault();
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    cacherErreur();

    if (password !== confirm) {
        afficherErreur("Les mots de passe ne correspondent pas");
        return;
    }

    const result = await register(nom, email, password);

    if (result.success) {
        window.location.href = "login.html?registered=1";
    } else {
        afficherErreur(result.message || "Erreur lors de l'inscription");
    }
}

// ----------------------------------------------------------------
// HELPERS UI
// ----------------------------------------------------------------

function afficherErreur(message) {
    const el = document.getElementById("error-msg");
    if (!el) return;
    el.textContent = message;
    el.style.display = "block";
}

function cacherErreur() {
    const el = document.getElementById("error-msg");
    if (!el) return;
    el.style.display = "none";
}

// Affiche un message de succès (ex: après inscription)
function afficherSucces(message) {
    const el = document.getElementById("success-msg");
    if (!el) return;
    el.textContent = message;
    el.style.display = "block";
}
