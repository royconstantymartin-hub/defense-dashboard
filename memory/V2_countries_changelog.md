# V2 page « Countries » — Journal de traçabilité des travaux (lot 1)

> Destinataire : AMOA fonctionnel. Auteur : développeur (Claude Code).
> Objet : traçabilité complète du premier lot de développement de la V2, livré
> sous contrainte budgétaire stricte (**aucun achat** : pas de flux de données
> sous licence, pas d'API tierce payante, stack existante uniquement).

## 1. Périmètre livré — le « socle de traçabilité » (fil rouge du cadrage)

Le lot 1 implémente la **fondation sans laquelle aucun autre chantier n'est
fiabilisable** : rendre chaque donnée affichée sourcée, datée, méthodologiquement
qualifiée et exportable de façon citable. Tout est faisable avec des sources
**ouvertes et gratuites** (SIPRI, NATO, Global Firepower, rapports nationaux).

## 2. Correspondance chantiers ↔ réalisations

| Chantier (cadrage) | Réalisé dans le lot 1 | Statut |
|---|---|---|
| C1 — Sourcing & traçabilité | Registre de sources, badge honnête sourcé/estimation, tooltips de citation | ✅ Livré |
| C2 — Millésimes & fraîcheur | Constante `DATA_VINTAGE` (source de vérité unique), « last reviewed », fin des « 2024 » en dur | ✅ Livré |
| C4 — Harmonisation méthodologique | Dictionnaire `metricMethodology` (compté/exclu/unité/caveat) branché sur les tuiles | ✅ Livré |
| C8 — Fonctions chercheur (export) | Export **BibTeX** + **RIS** + CSV enrichi (citation + date de consultation) | ✅ Livré (export) |
| C0 — Modèle données sourçable | Modèle de citation côté front prêt ; migration back vers MongoDB | 🟡 Partiel |

## 3. Détail des modifications (fichiers / objets)

### Nouveaux fichiers
- `frontend/src/data/sources.js`
  - `DATA_VINTAGE` : millésime de référence unique (budget FY, édition capacités, `last_reviewed`).
  - `SOURCES` : registre de citations complètes (éditeur, année, URL, date de consultation, accès ouvert oui/non).
  - Helpers : `resolveSource`, `sourceShortLabel`, `citationText`, `toBibTeX`, `toRIS`, `buildBibliography`, `downloadTextFile`.
- `frontend/src/data/metricMethodology.js`
  - `METRIC_METHODOLOGY` : pour chaque métrique → ce qui est **compté**, **exclu**, l'**unité**, la **source primaire**, et un **caveat** quand la métrique est hétérogène (drones, air_defense, missiles).

### `frontend/src/pages/Expenditures.jsx`
- Imports des deux nouveaux modules.
- **Carte « Military Capabilities »** : le badge en dur « IISS Military Balance 2024 · estimates » (affiché à tort sur *toutes* les fiches) est remplacé par un badge dynamique branché sur le flag `cap._sourced` (jusqu'ici calculé mais jamais utilisé) :
  - vert « Sourced · IISS Military Balance » si données réellement sourcées,
  - ambre « Aggregate estimate · unverified » sinon.
- **Bandeau « Equipment Breakdown »** : étiquette en dur remplacée par source dynamique + unité méthodologique + infobulle (compté/exclu) + ⚠ caveat éventuel.
- **En-tête de page & cartes stats** : tous les « 2024 » en dur remplacés par `DATA_VINTAGE.expenditure_fy` ; ajout de « Dataset last reviewed: … ».
- **Export du tableau** : un seul bouton CSV → barre de 3 boutons **CSV / BibTeX / RIS**. CSV enrichi de 2 colonnes (`Source citation`, `Accessed`) avec échappement des guillemets.
- **Colonne « Source » du tableau** : libellé normalisé (`sourceShortLabel`) + citation complète au survol.

## 4. Limites et points de vigilance (transparence)

- **Build non exécuté** : `frontend/node_modules` n'est pas installé dans
  l'environnement ; lancer `yarn install` aurait consommé réseau/temps sans
  valeur ajoutée pour ce lot. Validation faite par **revue manuelle** (portée des
  variables, symboles importés/exportés, icônes déjà importées). ➡️ À faire côté
  CI : `yarn build` + lint avant merge.
- **Sources IISS** : la citation reste référencée (usage légitime), mais la V2
  distingue désormais clairement « sourcé » vs « estimation interne » — fin de
  l'attribution trompeuse.
- **Données toujours codées en dur** dans `defenseCapabilities.js` : le lot 1
  fiabilise la *présentation* de la provenance ; la *migration en base* (C0) et
  l'*élargissement de couverture* (C3) restent à planifier.

## 5. Reste à faire (prochains lots, par priorité)

1. **C0** — migrer `defenseCapabilities.js` → collections MongoDB sourcées + endpoints.
2. **C2** — snapshots versionnés (séries temporelles) + badge « périmé » automatique.
3. **C3** — élargir la couverture pays + états honnêtes « donnée non disponible ».
4. **C6** — remplacer le matching news par regex (`server.py:1211-1218`) par un appariement d'entités (faisable sans API payante : alias + filtrage local).
5. **C7** — vraies dates de contrats (fin des lots « 1er du mois ») + élargir réglementations.
6. **C5** — couche analytique éditoriale sourcée (top 30 pays).
7. **C9** — CI de données : validation de schéma + link-checker des URL sources.

## 6. Definition of Done — avancement

- [x] Aucune valeur de capacité ne peut afficher un label de source faisant autorité sans l'être (flag `_sourced` branché).
- [x] Millésime unique + date de dernière revue affichés.
- [x] Méthodologie consultable par métrique (compté/exclu).
- [x] Export citable (BibTeX/RIS + CSV avec citation et date de consultation).
- [ ] 100 % des chiffres avec URL par donnée (dépend de C0 — migration base).
- [ ] Couverture ≥ 150 pays (C3).
