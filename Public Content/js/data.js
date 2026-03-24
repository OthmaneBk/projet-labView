// Mock basé sur la vraie structure de labview_db
// Tailles : S / M / L  (enum DB)
// Ingrédients joints depuis pizza_ingredient + ingredient

const PIZZAS_MOCK = [
    { id_pizza: 1,  nom_pizza: "Margherita",   taille: "S", prix: 6.50,  ingredients: ["Sauce tomate", "Fromage", "Basilic"] },
    { id_pizza: 2,  nom_pizza: "Margherita",   taille: "M", prix: 8.50,  ingredients: ["Sauce tomate", "Fromage", "Basilic"] },
    { id_pizza: 3,  nom_pizza: "Margherita",   taille: "L", prix: 10.50, ingredients: ["Sauce tomate", "Fromage", "Basilic"] },
    { id_pizza: 4,  nom_pizza: "Regina",       taille: "S", prix: 7.50,  ingredients: ["Sauce tomate", "Fromage", "Champignons", "Jambon"] },
    { id_pizza: 5,  nom_pizza: "Regina",       taille: "M", prix: 9.50,  ingredients: ["Sauce tomate", "Fromage", "Champignons", "Jambon"] },
    { id_pizza: 6,  nom_pizza: "Regina",       taille: "L", prix: 11.50, ingredients: ["Sauce tomate", "Fromage", "Champignons", "Jambon"] },
    { id_pizza: 7,  nom_pizza: "4 Fromages",   taille: "S", prix: 8.00,  ingredients: ["Fromage", "Mozzarella", "Basilic", "Ail"] }
];
