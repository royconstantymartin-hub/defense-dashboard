# 🏛️ Guide d'architecture — Defense Intelligence Hub

> **Pour qui est ce guide ?**
> Pour quelqu'un qui n'a **aucune notion** de programmation. Pas besoin de savoir
> ce qu'est un « backend », une « base de données » ou « GitHub ». On va tout
> expliquer avec des images simples, comme si on décrivait un restaurant.

---

## 1. L'idée en une phrase

Ta plateforme **Defense Intelligence Hub** est un **site web** qui rassemble plein
d'informations sur l'industrie de la défense : les entreprises, leurs actions en
bourse, les fusions d'entreprises, les contrats, les réglementations, les produits
(avions, missiles…), les actualités, etc.

C'est un peu comme un **grand tableau de bord d'avion** : un seul écran qui te
montre, d'un coup d'œil, tout ce qui se passe dans le secteur.

---

## 2. La grande analogie : le restaurant 🍽️

Pour comprendre **toutes** les pièces de ta plateforme, imagine un restaurant.
Garde cette image en tête, on y reviendra tout le temps.

| Dans un restaurant…           | Dans ta plateforme…        | Son rôle                                   |
|-------------------------------|----------------------------|--------------------------------------------|
| La **salle** (déco, tables)   | Le **Frontend**            | Ce que le client voit et touche            |
| La **cuisine**                | Le **Backend**             | Là où le vrai travail se fait, caché       |
| Le **garde-manger / frigo**   | La **base de données**     | Là où on stocke tous les ingrédients       |
| Le **serveur** qui fait l'aller-retour | Les **« requêtes »** (API) | Il porte les commandes et les plats |
| Le **carnet de recettes**     | **GitHub**                 | L'historique de toutes les versions        |
| Le **local du restaurant**    | **Railway** (hébergement)  | L'endroit physique où tout tourne          |

Maintenant, détaillons chaque pièce.

---

## 3. Le Frontend = la salle du restaurant 🪑

Le **frontend** (prononce « front-eïnd », ça veut dire « l'avant »), c'est **tout
ce que tu vois** quand tu ouvres le site dans ton navigateur :
- les boutons,
- les couleurs,
- les graphiques,
- les menus sur le côté,
- les tableaux de données.

C'est **la salle du restaurant** : la déco, l'ambiance, les menus posés sur la
table. Le client (= l'utilisateur) ne voit que ça. Il ne voit jamais la cuisine.

Dans ton projet, le frontend vit dans le dossier **`frontend/`**.

**Les « pages » de ton site** (dossier `frontend/src/pages/`) sont comme les
**différentes salles** de ton restaurant, chacune avec un thème :
- `Dashboard.jsx` → la page d'accueil avec le résumé
- `MarketData.jsx` → les cours de bourse
- `MAActivity.jsx` → les fusions et rachats d'entreprises
- `Contracts.jsx` → les contrats de défense
- `Products.jsx` → les produits (avions, missiles…)
- `Regulations.jsx` → les réglementations
- `Login.jsx` → la porte d'entrée (se connecter)
- …et d'autres (Quiz, Lexique, Carte du monde…)

> **Mot technique : React**
> Ton frontend est construit avec un outil qui s'appelle **React**. Pense à React
> comme à un jeu de **briques Lego** : au lieu de construire chaque page à la
> main, on assemble des petits morceaux réutilisables (un bouton, une carte, un
> tableau) pour bâtir les pages rapidement. Ces briques s'appellent des
> **« composants »** (dossier `frontend/src/components/`).

---

## 4. Le Backend = la cuisine 👨‍🍳

Le **backend** (« back-eïnd » = « l'arrière »), c'est la partie **cachée** qui
fait le vrai travail. L'utilisateur ne la voit jamais, mais sans elle, rien ne
fonctionne.

C'est **la cuisine du restaurant**. Quand tu commandes un plat, tu ne vois pas
ce qui se passe derrière la porte battante : on prend les ingrédients, on cuisine,
on dresse l'assiette, et le serveur te l'apporte.

Le backend de ta plateforme, c'est lui qui :
- vérifie ton mot de passe quand tu te connectes,
- va chercher la liste des entreprises,
- calcule les statistiques du tableau de bord,
- récupère les vrais cours de bourse sur internet.

Dans ton projet, presque tout le backend tient dans **un seul gros fichier** :
**`backend/server.py`** (plus de 3 000 lignes !). C'est le **chef cuisinier** qui
connaît toutes les recettes.

> **Mot technique : FastAPI (en Python)**
> Le backend est écrit dans un langage qui s'appelle **Python**, avec un outil
> nommé **FastAPI**. Python est un langage réputé facile à lire (presque de
> l'anglais). FastAPI, c'est ce qui permet à la cuisine de **recevoir les
> commandes** et de **renvoyer les plats** très vite.

---

## 5. La base de données (MongoDB) = le garde-manger 🧊

La **base de données**, c'est l'endroit où on **range et conserve** toutes les
informations pour ne pas les perdre. Si on éteint l'ordinateur, les données
restent là, bien rangées.

C'est **le frigo et le garde-manger** du restaurant : tous les ingrédients sont
stockés, étiquetés, organisés sur des étagères.

Dans ton cas, la base de données s'appelle **MongoDB**. Elle range les infos dans
des **« collections »**, qui sont comme des **grandes étagères étiquetées** :

| Étagère (collection) | Ce qu'on y range                          |
|----------------------|-------------------------------------------|
| `users`              | Les comptes utilisateurs (toi, etc.)      |
| `defense_players`    | Les entreprises de défense                |
| `announcements`      | Les actualités / annonces                 |
| `ma_activities`      | Les fusions et rachats                    |
| `contracts`          | Les contrats                              |
| `products`           | Les produits (équipements militaires)     |
| `regulations`        | Les réglementations                       |
| `expenditures`       | Les dépenses militaires par pays          |

> **Pourquoi « Mongo » et pas un tableau Excel ?**
> Un tableau Excel a des colonnes très rigides. MongoDB est plus souple : chaque
> « fiche » (on dit un **« document »**) peut contenir des informations un peu
> différentes, comme des **fiches cartonnées** dans une boîte. C'est pratique
> quand les données ne se ressemblent pas toutes parfaitement.

> **« Semer » les données (seed)**
> Au début, le garde-manger est vide. Pour le remplir d'un coup avec des données
> de départ (118 entreprises, 140 produits…), on appuie sur le bouton **« Seed
> Data »** dans le panneau Admin. *Seed* veut dire « semer » : on plante les
> graines de départ.

---

## 6. Le serveur (= les allers-retours) : comment tout se parle 🏃‍♂️

C'est le cœur du fonctionnement. Voici ce qui se passe **concrètement** quand tu
utilises le site, étape par étape.

Imagine que tu cliques sur la page « Cours de bourse » :

1. **Toi (le client)** tu cliques. → *Tu passes commande à table.*
2. **Le frontend (la salle)** envoie une demande à la cuisine :
   « Donne-moi la liste des entreprises ». → *Le serveur note la commande et file
   en cuisine.*
3. **Le backend (la cuisine)** reçoit la demande, va chercher les infos dans la
   base de données. → *Le cuisinier ouvre le frigo, prend les ingrédients.*
4. **Le backend** prépare la réponse et la renvoie. → *Le plat est dressé.*
5. **Le frontend** reçoit les données et les affiche joliment à l'écran (tableau,
   graphique). → *Le serveur t'apporte l'assiette, dressée pour être belle.*

Ces **allers-retours** entre la salle et la cuisine s'appellent des **« requêtes
API ».**

> **Mot technique : API**
> Une **API**, c'est simplement le **menu + le passe-plat** entre la salle et la
> cuisine. C'est un ensemble de demandes possibles, bien définies. Par exemple,
> dans ta plateforme :
> - `GET /api/defense-players` = « donne-moi la liste des entreprises »
> - `POST /api/auth/login` = « voici mon email + mot de passe, laisse-moi entrer »
>
> `GET` veut dire **« va chercher »** (lire une info).
> `POST` veut dire **« dépose »** (envoyer une nouvelle info).
> Toutes les demandes de ta plateforme commencent par `/api/` — c'est le
> **passe-plat officiel** entre la salle et la cuisine.

---

## 7. La connexion et la sécurité (le bracelet VIP) 🎟️

Certaines actions ne sont permises qu'aux personnes connectées. Comment le
système sait qui tu es ?

Quand tu te connectes avec ton email et mot de passe, le backend vérifie que
c'est bien toi, puis te donne un **« jeton »** (en anglais : **token**).

Pense à un **bracelet VIP de festival** : à l'entrée, on vérifie ton billet une
fois, puis on te met un bracelet au poignet. Ensuite, tu n'as plus à re-montrer ton
billet à chaque stand — il te suffit de montrer le bracelet.

- Ce bracelet, dans ta plateforme, s'appelle un **JWT** (un long code secret).
- Il est rangé dans ton navigateur (dans le `localStorage`, une sorte de **petite
  poche** dans le navigateur).
- À chaque nouvelle demande, le frontend montre le bracelet au backend.

Deux protections importantes :
- Les mots de passe ne sont **jamais** stockés en clair. Ils sont **brouillés**
  (technique appelée **bcrypt**) — comme un coffre-fort dont on ne garde que
  l'empreinte, pas la clé.
- Si quelqu'un se trompe **10 fois** de mot de passe en 15 minutes, le système le
  bloque temporairement (un **videur** qui repère les intrus).

---

## 8. Les données « vivantes » : la bourse en direct 📈

Certaines infos ne sont pas figées dans le garde-manger : elles changent tout le
temps. Les **cours de bourse**, par exemple.

Ta plateforme va les chercher **en direct sur internet** (via un service appelé
**Yahoo Finance**). Mais pour ne pas redemander 1000 fois par minute, elle
**garde la réponse en mémoire pendant 1 heure** (c'est ce qu'on appelle un
**cache**).

Analogie : au lieu de courir à la boulangerie chaque fois qu'un client veut du
pain, le restaurant **achète un stock le matin** et le réutilise toute la journée.

Il y a aussi un **petit robot automatique** (appelé **scheduler**) qui rafraîchit
ces prix régulièrement, tout seul, sans qu'on lui demande. Comme un **réveil** qui
sonne pour dire « va remettre à jour les prix ».

---

## 9. GitHub = le carnet de recettes avec historique 📓

**GitHub**, c'est l'endroit où est **rangé tout le code** de ta plateforme, avec
**l'historique complet** de toutes les modifications.

Imagine un **carnet de recettes magique** :
- chaque fois qu'on change une recette, on garde l'ancienne version ;
- on peut revenir en arrière si on a fait une bêtise ;
- plusieurs cuisiniers peuvent travailler sans s'écraser le travail.

Quelques mots de vocabulaire que tu croiseras :
- **Commit** (« commite ») = **sauvegarder une étape** dans le carnet, avec une
  petite note qui dit ce qu'on a changé.
- **Branch** (« branche ») = une **copie de travail** pour bricoler tranquillement
  sans toucher à la version principale. (La tienne s'appelle
  `claude/platform-architecture-guide-o31guz`.)
- **Push** (« pousse ») = **envoyer** tes sauvegardes vers GitHub pour qu'elles
  soient en sécurité et partagées.

---

## 10. Railway = le local qui héberge le restaurant 🏠

Tout ce qu'on a décrit doit **tourner quelque part**, sur un ordinateur allumé
24h/24 et accessible depuis internet. Ce n'est pas ton ordi perso : c'est un
**ordinateur loué dans le cloud**.

Ta plateforme est hébergée sur **Railway**. C'est **le local du restaurant** :
les murs, l'électricité, l'adresse où les clients viennent.

> **Mot technique : Docker**
> Pour déménager facilement le restaurant n'importe où, on met **toute la cuisine
> dans un container** (un **conteneur**, comme un conteneur de bateau) : ingrédients,
> ustensiles, recettes, tout dedans. Comme ça, où qu'on pose ce conteneur, le
> restaurant fonctionne pareil. C'est le rôle du fichier **`Dockerfile`**.

---

## 11. Récapitulatif visuel 🗺️

Voici le voyage complet d'un clic, du début à la fin :

```
   TOI (navigateur)
        │  « Montre-moi les entreprises »
        ▼
   ┌─────────────────┐
   │   FRONTEND      │   = la salle (React)
   │   (frontend/)   │   ce que tu vois
   └─────────────────┘
        │  requête API  (/api/defense-players)
        ▼
   ┌─────────────────┐
   │    BACKEND      │   = la cuisine (Python / FastAPI)
   │  (server.py)    │   le travail caché
   └─────────────────┘
        │  « va chercher les fiches »
        ▼
   ┌─────────────────┐
   │   MONGODB       │   = le garde-manger
   │ (base de données)│  là où tout est rangé
   └─────────────────┘

   Et tout ça :
   • est rangé/versionné sur ── GitHub  (le carnet de recettes)
   • tourne en ligne sur ────── Railway (le local, via Docker)
```

---

## 12. Le glossaire express 📖

| Mot                | Traduction simple                                         |
|--------------------|-----------------------------------------------------------|
| **Frontend**       | La salle : ce que tu vois à l'écran                       |
| **Backend**        | La cuisine : le travail caché                             |
| **Base de données**| Le garde-manger : où les infos sont rangées               |
| **MongoDB**        | Le type de garde-manger qu'on utilise (souple, par fiches)|
| **API / requête**  | Le passe-plat : les demandes entre salle et cuisine       |
| **React**          | Les Lego pour construire la salle                         |
| **Python / FastAPI**| La langue et les outils de la cuisine                    |
| **Token / JWT**    | Le bracelet VIP qui prouve qui tu es                      |
| **Cache**          | Le stock du matin, pour aller plus vite                   |
| **Scheduler**      | Le réveil qui rafraîchit les données tout seul            |
| **GitHub**         | Le carnet de recettes avec tout l'historique              |
| **Commit / Push**  | Sauvegarder une étape / l'envoyer sur GitHub              |
| **Railway**        | Le local loué où le restaurant tourne en ligne            |
| **Docker**         | Le conteneur qui emballe tout le restaurant               |

---

*Et voilà ! Tu connais maintenant toutes les grandes pièces de ta plateforme.
Chaque fois qu'un mot technique te fait peur, reviens à l'image du restaurant. 🍽️*
