# Guide de Déploiement - ALTÉZA EVEN'T

## 🚀 Déploiement en Production

### Problème résolu : `window.__prependToUrl is not a function`

Cette erreur se produisait lors du déploiement en production. Elle a été résolue par les modifications suivantes :

### ✅ Solutions appliquées

1. **Configuration Vite optimisée** (`vite.config.ts`)
   - Ajout de `base: '/'` pour la base URL
   - Configuration des noms de fichiers avec hash
   - Optimisation du target pour ES2015
   - Désactivation des sourcemaps en production

2. **Gestion des assets** (`src/lib/utils.ts`)
   - Fonction `getAssetPath()` pour gérer les chemins d'assets
   - Fonction `preloadImage()` pour le préchargement sécurisé

3. **Correction des chemins d'assets** (`src/utils/image-preloader.ts`)
   - Remplacement de `/src/assets/` par `assets/`
   - Utilisation de la fonction `getAssetPath()`

4. **Configuration serveur**
   - Fichier `.htaccess` pour Apache
   - Fichier `nginx.conf` pour Nginx
   - Fichier `_redirects` pour Netlify/Vercel

### 📋 Scripts disponibles

```bash
# Build de production
npm run build

# Build avec nettoyage
npm run predeploy

# Test du build
npm run test-build

# Déploiement complet
npm run deploy
```

### 🔧 Configuration requise

#### Variables d'environnement
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_supabase
```

#### Serveur web
- **Apache** : Utiliser le fichier `.htaccess`
- **Nginx** : Utiliser le fichier `nginx.conf`
- **Netlify/Vercel** : Utiliser le fichier `_redirects`

### 🚨 Points d'attention

1. **Cache** : Vider le cache du navigateur après déploiement
2. **Assets** : S'assurer que tous les assets sont dans `/public/`
3. **Routes** : Toutes les routes doivent rediriger vers `index.html`
4. **HTTPS** : Utiliser HTTPS en production

### 📁 Structure de déploiement

```
dist/
├── index.html
├── assets/
│   ├── *.js (fichiers JavaScript)
│   ├── *.css (fichiers CSS)
│   └── *.jpg (images)
├── favicon.ico
└── manifest.json
```

### 🔍 Vérification post-déploiement

1. Ouvrir la console du navigateur
2. Vérifier qu'il n'y a pas d'erreurs JavaScript
3. Tester la navigation entre les pages
4. Vérifier le chargement des images
5. Tester les formulaires de contact

### 🆘 En cas de problème

1. Vérifier les logs du serveur
2. Tester en local avec `npm run preview`
3. Vérifier la configuration du serveur web
4. S'assurer que tous les fichiers sont uploadés

### 📞 Support

En cas de problème persistant, vérifier :
- La configuration du serveur web
- Les permissions des fichiers
- La configuration DNS
- Les certificats SSL
