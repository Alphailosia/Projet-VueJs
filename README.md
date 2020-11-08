# Projet-VueJs

## Etudiants : 
Stéphane désiré  
Sabrina Mercuri  
M1 - TD2

## Lancement du projet : 
- Lancement serveur : node serverCrudWithMongo.js
- Lancement client : npm run serve

## Points remarquables du projet : 
- L'ajout d'un restaurant via un formulaire (sur le site et dans la base de données) 
- La modification d'un restaurant (sur le site et dans la base de données via un autre type de formulaire que pour l'ajout)
- la recherche d'un restaurant sur le site (recherche progressive lorsque l'on tape le nom d'un restaurant en affichant également le nombre de restaurants trouvés)
- L'ajout de cartes et de menus pour les restaurants (partie "détails")

## Explication globale du projet : 
Notre projet permet d'afficher sur une page internet des restaurants importés à partir d'une base de données.  
- Nous avons sur la page de garde, la liste des différents restaurants que l'on peut trouver avec quelques informations ainsi qu'une image aléatoire trouvée sur internet et également un bouton détails pour en savoir plus.
Toujours sur cette page, nous pouvons trouver sur la gauche un menu permetant d'accéder à cette page de garde, une page d'ajout, une page de modification et une page de suppression des restaurants. Nous pouvons également changer le nombre de restaurants à afficher sur cette page (ici de 10 et pouvant aller jusqu'à 100) et une barre de recherche. Cette barre de recherche, permet de rechercher le noms des restaurants qu'on l'on souhaite trouver et la recherche est "prograssive" (dés que l'on tape une lettre la recherche se fait) et le nombre de restaurants trouvés pour la recherche est également affiché. 
- Pour la partie détails du restaurant (après avoir appuyé sur le bouton correspondant), une page s'affiche avec les informations principales du restaurant, sa localisation et également une carte de plats proposés par le restaurant (aléatoire) et qui peut générer un menu du jour et un menu gastronomique).
- Dans la partie "ajouter des restaurants", nous avaons accés à un formulaire nous permettant d'enregistrer un nouveau restaurant dans la base de données. Certains éléments sont obligatoires et une fois ajouté, un message nous précisera quand le restaurant a bien été ajouté. Nous pourrons retrouver ce restaurant dans la page d'accueil à la dernière page. 
- Pour la partie "modifier des restaurants", un bouton nous permettra de faire apparaitre un formulaire directement sur la page en ayant déjà les champs du restaurants pré-remplis. Nous pouvons alors les modifier et les enregistrer ou non. Le bouton "save" va permettre de modifier le restaurant directement sur le site et la base de données et le bouton "clos"e permettra de juste quitter le formulaire sans rien changer. 
- Pour finir, la partie suppression, va servir à supprimer un restaurant du site et de la base de données rien qu'en appuyant sur l'icone indiquée. 

## Lien de la vidéo :  
https://youtu.be/FcG-HyzJcmc 
