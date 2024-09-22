const eleve = [];
const elevesTires = []; // Liste des élèves déjà tirés

function entrerEleve(nom, prenom) {
        // Vérifier si l'élève est déjà dans la liste
    const eleveExistant = eleve.some(el => el.nom === nom && el.prenom === prenom);
        
    if (eleveExistant) {
         alert("élève déjà enregistré");
         return; // Ne pas ajouter l'élève
     }
        
    const nouveauEleve = {
         nom: nom,
         prenom: prenom,
     };
    eleve.push(nouveauEleve); // Ajouter l'élève à la liste
    localStorage.setItem("eleves", JSON.stringify(eleve)); // Enregistrer dans localStorage
    afficherEleves(); // Mettre à jour l'affichage des élèves
    }


    function chargerEleves() {//chager les eleves du localstorage
        const elevesStockes = localStorage.getItem("eleves");
        if (elevesStockes) {
            const elevesArray = JSON.parse(elevesStockes);
            elevesArray.forEach(eleve => {
                entrerEleve(eleve.nom, eleve.prenom); // Utiliser la fonction pour ajouter
            });
        }
    }

    
function afficherEleves() {
    const eleveListe = document.getElementById("eleveListe");
    eleveListe.innerHTML = "";

    eleve.forEach((el, index) => {
        const li = document.createElement("li");
        li.textContent = `${el.prenom} ${el.nom}`;
        eleveListe.appendChild(li);
    });
}
function viderListe() {
    const confirmation = confirm("Vider toute la liste ?");
    if (confirmation) {
        eleve.length = 0;
        elevesTires.length = 0;
        afficherEleves();
        document.getElementById("tirage").textContent = "";
    }
}

function tirerAuSort() {
    if (eleve.length === 0) {
        document.getElementById("tirage").textContent = "Il n'y a aucun élève";
        return;
    }
    // eleves non tirés
    const elevesRestants = eleve.filter(e => !elevesTires.includes(e));
    if (elevesRestants.length === 0) {
        document.getElementById("tirage").textContent = "Les élèves ont été tirés.";
        return;
    }
    // Tirer un eleve non tire
    const eleveTire = elevesRestants[Math.floor(Math.random() * elevesRestants.length)];
    document.getElementById("tirage").textContent = `${eleveTire.prenom} ${eleveTire.nom} a été tiré.`;
    elevesTires.push(eleveTire);
}
document.addEventListener("DOMContentLoaded", chargerEleves);//appeler la fonction quicharge les eleves

document.getElementById("eleveForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    entrerEleve(nom, prenom); 
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
});
document.getElementById("viderListe").addEventListener("click", viderListe);
document.getElementById("tirerEleve").addEventListener("click", tirerAuSort);
