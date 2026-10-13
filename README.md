# A4C – Test Angular

Évaluation d'Angular pour remplacer, à terme, des écrans de l'ERP WinDev. Le test reproduit deux fenêtres réelles, la **liste des OF** et la **fiche OF**, avec des données simulées.

## En bref : Angular est le meilleur choix pour notre ERP

Un ERP, ce sont **des dizaines d'écrans sur le même modèle** (listes, fiches, onglets), **maintenus pendant des années**. Ce qui compte, c'est la **cohérence** et la **maintenabilité**, pas la vitesse de démarrage. C'est le point fort d'Angular.

| | Angular | React |
|---|---|---|
| Nature | **Framework complet** : routage, HTTP, formulaires inclus | Bibliothèque d'affichage, le reste est à choisir et assembler |
| Organisation du code | **Imposée** : tous les écrans se ressemblent | Libre : dépend de la discipline de l'équipe |
| Détection des erreurs | **TypeScript obligatoire**, HTML vérifié aussi | Optionnelle |
| Mises à jour | **Cadencées** (une version tous les 6 mois, maintenue 18 mois), migrations automatiques | Au rythme de chaque bibliothèque |
| Pour un développeur WinDev | **Notions familières** (fenêtre, procédure, structure) | Approche plus éloignée |
| Prise en main | Plus longue (quelques jours) | Plus rapide (quelques heures) |
| Choix de composants d'interface | Plus restreint | Très large |

**Ce qu'il faut prévoir :** une formation de quelques jours, le choix d'une grille de données solide (AG Grid ou ng-zorro-antd, gratuits), et l'autorisation des outils npm sur les postes de développement.

## Lancer le projet

Prérequis : Node.js LTS et Angular CLI (`npm install -g @angular/cli`).

```bash
npm install
ng serve
```

Ouvrir ensuite <http://localhost:4200>.

> Sur les postes A4C, PowerShell bloque `npm` et `ng`. Utilisez l'**Invite de commandes** (cmd) comme terminal, ou tapez `npm.cmd` / `ng.cmd`.

## Ce que fait l'application

- **Liste des OF** (`/ofs`) : tri par colonne, filtre par statut, « Charger tous les OFs », sélection d'une ligne, modification du commentaire.
- **Fiche OF** (`/ofs/:numero`) : ouverte par double-clic ou par le bouton « Fiche OF ». Elle affiche les informations de l'OF, une copie du numéro et des onglets. L'onglet Bdc contient le tableau des bons de coupe avec sa ligne « Somme ».
- **Données** : fichiers JSON dans `public/data/`, lus comme une vraie API. Pour brancher le serveur, seuls `src/app/api.config.ts` et les services changent.

## Organisation du code

```text
src/app/
├── app.routes.ts      les URL et l'écran affiché pour chacune
├── shared/            composants réutilisables
└── ofs/
    ├── models/        structures de données (OF, statut, bon de coupe)
    ├── services/      accès aux données
    ├── liste-ofs/     fenêtre 1
    └── fiche-of/      fenêtre 2
libs/ui/               composants d'interface spartan (bouton, table, onglets…)
```

| WinDev | Angular |
|---|---|
| Fenêtre | Composant |
| Collection de procédures | Service |
| Structure | Interface TypeScript |
| `Ouvre(FEN_Fiche, nOF)` | `router.navigate(['/ofs', numero])` |
| Rafraîchir l'affichage | Automatique grâce aux signals |

**Technologies :** Angular 22 (signals, composants *standalone*), Tailwind CSS, spartan/ui (licence MIT). PrimeNG a été écarté, car ses versions récentes sont sous licence payante.
