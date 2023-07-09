# Social Network #CaC'estCool

A social app to create, read and comment post.

## Install dependencies

`npm i`

## Start express.js server

Copy the `.env.default` file and rename it `.env`. Change the value of the variables related to MongoDB so that the server can connect to your database and provide a value for the JWT SECRET.

Run the following commands:
`cd expressjs_server`
`nodemon index.js`
Ther server is running on the port 3000. Navigate to `http://localhost:3000/`

## Run vue project

`cd vue project`
`npm i`
`yarn dev`
Navigate to `http://localhost:5173/`

### Créer un compte / Se connecter

L'utilisateur peut se connecter ou créer un nouveau compte en cliquant sur le bouton `Se connecter`' ou `S'enregistrer` dans le menu.

### Accueil

La page d'accueil affiche les posts (du plus récent ou plus ancien) : une card par post avec le titre, le contenu, l'auteur et la date de création du post.

Si l'utilisateur n'est pas connecté, il voit uniquement les posts sans pouvoir faire d'action dessus.

Si l'utilisateur est connecté et qu'il n'est pas le créateur du post, il a la possibilité de `Consulter` le post.

Si l'utilisateur est connecté et qu'il est le créateur du post, il a la possibilité de  `Consulter` et de `Modifier` le post.

### Mes posts

Pour consulter les posts qu'il a rédigé, l'utilisateur peut cliquer sur `Mes Posts` dans le menu.

### Modifier un post

L'utilisateur connecté peut modifier un post qu'il a créé soit :

- en cliquant sur le bouton `Modifier` de la card du post sur la page d'Accueil
- en cliquant sur le bouton `Modifier` de la card du post sur la page Mes posts

L'utilisateur est alors redirigé vers le formulaire de modification du post en question. Après avoir modifié les informations du post (le titre ou le contenu) et avoir cliqué sur le bouton `Enregistrer`, l'utilisateur est redirigé soit vers la page d'accueil si il vient de la page d'accueil soit sur la page Mes Posts si il vient de la page Mes Posts.

### Consulter un post

L'utilisateur connecté peut consulter un post en cliquant sur le bouton `Consulter` de la card du post sur la page d'Accueil.

L'utilisateur est alors redirigé vers la page du post en question.

Si l'utilisateur a liké le post, l'icône thumbs-up est colorée entièrement en rouge. Si il n'a pas liké le post, seul le contour de l'icône est rouge.
En cliquant sur cette icône, l'utilisateur peut soit "liker" ou "un-liker" le post.

En cliquant sur l'icône comment, l'utilisateur peut consulter les commentaires du post si il y en a et ajouter un commentaire.
Après avoir envoyé son commentaire, les informations du post se rafraichissent et on voit apparaitre le nouveau commentaire.
(Infos affichées par commentaire : l'auteur, la date et l'heure de création et le contenu).
