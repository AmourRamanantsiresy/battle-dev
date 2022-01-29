//fonction qui converti les heurs et minutes en minutes seulments
let htm = (hours, min) => hours * 60 + min;
//fonction qui converti les minutes en heures et minutes
let mth = (min) => [Math.floor(min / 60), min % 60];
let joursIndex = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]
// cI : tout les crénneaux indisponibles j; jour, h: heures
let cI = [
    { j: 1, h: [htm(8, 45), htm(9, 20)] },
    { j: 1, h: [htm(10, 45), htm(13, 00)] },
    { j: 5, h: [htm(9, 26), htm(9, 56)] },
    { j: 3, h: [htm(11, 9), htm(11, 28)] },
    { j: 3, h: [htm(11, 10), htm(11, 30)] },
    { j: 5, h: [htm(16, 15), htm(16, 34)] },
    { j: 5, h: [htm(16, 15), htm(16, 20)] },
    { j: 3, h: [htm(8, 40), htm(10, 12)] },
]
//on trie cI dans l'ordre croissant de ces jours
cI.sort((a, b) => a.j - b.j);
//5 tableaux pour 5jours, où l'on vas stoker les créneaux
let j1 = [], j2 = [], j3 = [], j4 = [], j5 = [];
let jcI = [j1, j2, j3, j4, j5]
//un tableau de longureur 5 contenant un autre tableau contenant 8h00
let jcT = [[htm(8, 0)], [htm(8, 0)], [htm(8, 0)], [htm(8, 0)], [htm(8, 0)]]
//cI étant déja trié, on transfert les objets de cI dans chaque tableau de jcI qui corespond à son jour
for (a of cI)
    jcI[a.j - 1].push(a.h)
//dans chaque tableau de jcI, on trie les obljets par odre croissant par rapport à leurs heures de début
for (a of jcI)
    a.sort((a, b) => a[0] - b[0]);
//on transfert toute les heurs dans les objets de de chaque tableaux de jcI dans les tableaux de jcT corespondant a leurs dates -1 
for (a of jcI)
    for (b of a)
        for (c of b) {
            let jours = jcI.indexOf(a);
            jcT[jours].push(c);
        }
/**
 * on réorganise chaque tableau de jcT de tel sorte que :
 * * toute créneaux indisponibles compris dans un autre créneaux indisponible soit éffacé
 * * touts créneaux indisponibele se chevauchant soit trasformer en un seul 
 * * * ex: on a deux créneux indispo 12h00-13h00    et 12h50-15h00 ==> on a 12h00-15h00
 */
for (a of jcT) {
    a.push(htm(17, 59))
    for (let i = 2; i < a.length + 3; i += 2) {
        if (i > 2 && a[i - 2] > a[i]) {
            a.splice(i, 1)
            a.splice(i - 1, 1)
        }
        else if (a[i - 2] > a[i - 1]) {
            a.splice(i - 1, 1)
            a.splice(i - 2, 1)
        }
    }
}
//on cherche dans chaque tableau de jcT toute suites de minute qui comporte 60min
// et on les transformes en heures grace a la fonction mth() on des 
//transferts dans le tableau heureDispo avec leurs jours transformé en string grace au tableau joursIndex
let heureDispo = [];
for (a of jcT)
    for (let i = 1; i < a.length; i += 2)
        if (a[i] - a[i - 1] >= 59) {
            heureDispo.push(joursIndex[jcT.indexOf(a)], mth(a[i - 1]), mth(a[i - 1] + 59))
        }
//pour la mise en forme on transforme toute minute égale à 0 en string "00"
for (let a = 1; a < 3; a++)
    if (heureDispo[a][1] == 0)
        heureDispo[a][1] = "00";
//Enfin on affiche le premier résultat grâce à la première élément du tableau
console.log(`${heureDispo[0]}, il y a une heure disponible de ${heureDispo[1][0]}h:${heureDispo[1][1]} à ${heureDispo[2][0]}h:${heureDispo[2][1]}`);