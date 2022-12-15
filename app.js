const cases = [...document.querySelectorAll(".cell")];
const listeKeyCode = cases.map((touche) => touche.dataset.key);

const afficheEcran = (grille, joueurActif) => {
  for (let i = 0; i < 9; i++) {
    if (grille[i] == 1) {
      document.getElementById("croix" + (i + 1)).style.visibility = "visible";
      document.getElementById("rond" + (i + 1)).style.visibility = "hidden";
    } else if (grille[i] == 2) {
      document.getElementById("croix" + (i + 1)).style.visibility = "hidden";
      document.getElementById("rond" + (i + 1)).style.visibility = "visible";
    }
  }

  if (joueurActif == 1) {
    document.getElementById("jetonJouerJoueur1").style.visibility = "visible";
    document.getElementById("jetonJouerJoueur2").style.visibility = "hidden";
  } else {
    document.getElementById("jetonJouerJoueur1").style.visibility = "hidden";
    document.getElementById("jetonJouerJoueur2").style.visibility = "visible";
  }
};

function premierJoueur() {
  let aleatoire = Math.floor(Math.random() * 2 + 1);
  if (aleatoire === 1) {
    document.getElementById("jetonJouerJoueur2").style.visibility = "hidden";
    document.getElementById("jetonJouerJoueur1").style.visibility = "visible";
    return 1;
  } else {
    document.getElementById("jetonJouerJoueur1").style.visibility = "hidden";
    document.getElementById("jetonJouerJoueur2").style.visibility = "visible";

    return 2;
  }
}

const resetGrille = (grille) => {
  for (let i = 0; i < 9; i++) {
    grille[i] = 0;
  }
};

if (typeof grille == "undefined") {
  var grille = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var joueurActif = premierJoueur();
  var partieFinie = false;
  for (let i = 0; i < 9; i++) {
    document.getElementById("rond" + (i + 1)).style.visibility = "hidden";
    document.getElementById("croix" + (i + 1)).style.visibility = "hidden";
  }
}

function gagner() {
  //Regarder si on a gagné horizontalement
  for (let i = 0; i < 7; i += 3) {
    if (grille[i] != 0) {
      if (grille[i] == grille[i + 1] && grille[i] == grille[i + 2]) {
        return grille[i];
      }
    }
  }

  //Regarder si on a gagné verticalement
  for (let i = 0; i < 3; i++) {
    if (grille[i] != 0) {
      if (grille[i] == grille[i + 3] && grille[i] == grille[i + 6]) {
        return grille[i];
      }
    }
  }

  //Regarder si on a gagné diagonalement de gauche à droite
  if (grille[0] != 0) {
    if (grille[0] == grille[4] && grille[0] == grille[8]) {
      return grille[0];
    }
  }

  //Regarder si on a gagné diagonalement de droite à gauche
  if (grille[2] != 0) {
    if (grille[2] == grille[4] && grille[2] == grille[6]) {
      return grille[2];
    }
  }
}

function grillePleine() {
  for (let i = 0; i < 9; i++) {
    if (grille[i] == 0) {
      return 0;
    }
  }
  return 1;
}

const jeu = (caseCliquer) => {
  if (grille[caseCliquer - 1] == 0) {
    if (joueurActif == 1) {
      grille[caseCliquer - 1] = 1;
      joueurActif++;
    } else {
      grille[caseCliquer - 1] = 2;
      joueurActif -= 1;
    }

    afficheEcran(grille, joueurActif);

    if (gagner() == 1) {
      partieFinie = true;

      document.querySelector("#scoreJoueur1").textContent += "+ 1";
      let score = eval(document.querySelector("#scoreJoueur1").textContent);
      document.querySelector("#scoreJoueur1").textContent = score;

      setTimeout(function () {
        window.alert("Joueur 1 a gagné !");
      }, 1000);
    } else if (gagner() == 2) {
      partieFinie = true;

      document.querySelector("#scoreJoueur2").textContent += "+ 1";
      let score = eval(document.querySelector("#scoreJoueur2").textContent);
      document.querySelector("#scoreJoueur2").textContent = score;

      setTimeout(function () {
        window.alert("Joueur 2 a gagné !");
      }, 1000);
    } else if (grillePleine() == 1) {
      setTimeout(function () {
        window.alert("Egalité !");
      }, 1000);
      setTimeout(function () {
        resetGrille(grille);
        joueurActif = premierJoueur();
        for (let i = 0; i < 9; i++) {
          document.getElementById("rond" + (i + 1)).style.visibility = "hidden";
          document.getElementById("croix" + (i + 1)).style.visibility =
            "hidden";
        }
        afficheEcran(grille, joueurActif);
      }, 1000);
    }
  }
};

document.addEventListener("click", (event) => {
  const caseCliquer = event.target.dataset.key;
  if (listeKeyCode.includes(caseCliquer) && partieFinie == false) {
    jeu(caseCliquer);
  }
});

document.querySelector(".reset").addEventListener("click", (event) => {
  partieFinie = false;
  resetGrille(grille);
  joueurActif = premierJoueur();
  for (let i = 0; i < 9; i++) {
    document.getElementById("rond" + (i + 1)).style.visibility = "hidden";
    document.getElementById("croix" + (i + 1)).style.visibility = "hidden";
  }
  afficheEcran(grille, joueurActif);
});
