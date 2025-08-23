#!/bin/bash

echo "🚀 Déploiement d'ALTÉZA EVEN'T"
echo "================================"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans le répertoire racine du projet"
    exit 1
fi

# Nettoyer et construire
echo "📦 Nettoyage et construction..."
rm -rf dist
npm run build

# Vérifier que le build s'est bien passé
if [ ! -f "dist/index.html" ]; then
    echo "❌ Erreur: Le build a échoué"
    exit 1
fi

echo "✅ Build réussi !"
echo ""
echo "📁 Contenu du dossier dist/:"
ls -la dist/

echo ""
echo "🌐 Fichiers de configuration disponibles:"
echo "   - .htaccess (Apache)"
echo "   - nginx.conf (Nginx)"
echo "   - _redirects (Netlify/Vercel)"
echo ""

echo "📋 Instructions de déploiement:"
echo "================================"
echo ""
echo "1️⃣  Pour un hébergeur Apache (OVH, Hostinger, etc.):"
echo "   - Uploadez tout le contenu du dossier 'dist/'"
echo "   - Le fichier .htaccess sera automatiquement utilisé"
echo ""
echo "2️⃣  Pour un hébergeur Nginx:"
echo "   - Uploadez tout le contenu du dossier 'dist/'"
echo "   - Configurez votre serveur avec le fichier 'nginx.conf'"
echo ""
echo "3️⃣  Pour Netlify/Vercel:"
echo "   - Connectez votre repository GitHub"
echo "   - Le fichier '_redirects' sera automatiquement utilisé"
echo ""
echo "4️⃣  Variables d'environnement à configurer:"
echo "   - VITE_SUPABASE_URL (optionnel, mode démo si non défini)"
echo "   - VITE_SUPABASE_ANON_KEY (optionnel, mode démo si non défini)"
echo ""
echo "🎯 Le site est prêt à être déployé !"
echo "📱 Toutes les améliorations mobile ont été appliquées."
