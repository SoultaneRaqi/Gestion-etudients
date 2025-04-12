const nomInput = document.getElementById("nomInput");
const ageInput = document.getElementById("ageInput");
const noteInput = document.getElementById("noteInput");
const addButton = document.getElementById("addButton");
const etudiantList = document.getElementById("etudiantListe");
const filterButton = document.getElementById("filterButton");
const majusculeButton = document.getElementById("majusculeButton");
const moyenneValue = document.getElementById("moyenneValue");

let tableauEtudiant = [];
let filtered = false;

// Ajouter un étudiant
addButton.addEventListener("click", () => {
  const etudiant = {
    nom: nomInput.value,
    age: ageInput.value,
    note: parseFloat(noteInput.value)
  };
  
  if (etudiant.nom && etudiant.age && !isNaN(etudiant.note)) {
    tableauEtudiant.push(etudiant);
    afficherEtudiant(tableauEtudiant);
    calculerMoyenne();
    nomInput.value = "";
    ageInput.value = "";
    noteInput.value = "";
  } else {
    alert("Veuillez remplir tous les champs correctement");
  }
});

// Afficher les étudiants
function afficherEtudiant(etudiants) {
  etudiantList.innerHTML = "";
  etudiants.forEach((etudiant, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${etudiant.nom}</td>
      <td>${etudiant.age}</td>
      <td>${etudiant.note.toFixed(2)}</td>
      <td><button class="btn btn-danger" onclick="supprimerEtudiant(${index})">Supprimer</button></td>
    `;
    etudiantList.appendChild(tr);
  });
}

// Supprimer un étudiant
function supprimerEtudiant(index) {
  tableauEtudiant.splice(index, 1);
  afficherEtudiant(filtered ? filtrerEtudiants(tableauEtudiant) : tableauEtudiant);
  calculerMoyenne();
}

// Filtrer les étudiants (note >= 10)
function filtrerEtudiants(etudiants) {
  return etudiants.filter(etudiant => etudiant.note >= 10);
}

filterButton.addEventListener("click", () => {
  filtered = !filtered;
  filterButton.textContent = filtered ? "Afficher Tous" : "Filtrer (Note ≥ 10)";
  afficherEtudiant(filtered ? filtrerEtudiants(tableauEtudiant) : tableauEtudiant);
});

// Afficher les noms en majuscule

let majusculeActive = false;

majusculeButton.addEventListener("click", () => {
  majusculeActive = !majusculeActive;
  
  if (majusculeActive) {
    majusculeButton.classList.add('majuscule-active');
  } else {
    majusculeButton.classList.remove('majuscule-active');
  }

  tableauEtudiant = tableauEtudiant.map(etudiant => ({
    ...etudiant,
    nom: majusculeActive ? etudiant.nom.toUpperCase() : etudiant.nom.toLowerCase()
  }));
  
  majusculeButton.textContent = majusculeActive 
    ? "Afficher Noms Normalement" 
    : "Afficher Noms en Majuscule";
  
  afficherEtudiant(filtered ? filtrerEtudiants(tableauEtudiant) : tableauEtudiant);
});


// Calculer la moyenne des notes
function calculerMoyenne() {
  if (tableauEtudiant.length === 0) {
    moyenneValue.textContent = "0.00";
    return;
  }
  
  const somme = tableauEtudiant.reduce((acc, etudiant) => acc + etudiant.note, 0);
  const moyenne = somme / tableauEtudiant.length;
  moyenneValue.textContent = moyenne.toFixed(2);
}

// Initialisation
calculerMoyenne();