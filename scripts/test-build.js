#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Vérification du build...');

// Vérifier que le dossier dist existe
const distPath = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Le dossier dist n\'existe pas. Exécutez "npm run build" d\'abord.');
  process.exit(1);
}

// Vérifier que index.html existe
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html n\'existe pas dans le dossier dist.');
  process.exit(1);
}

// Vérifier que les assets existent
const assetsPath = path.join(distPath, 'assets');
if (!fs.existsSync(assetsPath)) {
  console.error('❌ Le dossier assets n\'existe pas dans dist.');
  process.exit(1);
}

// Vérifier le contenu d'index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Vérifier que les scripts sont correctement référencés
if (!indexContent.includes('src="/assets/')) {
  console.error('❌ Les scripts ne sont pas correctement référencés dans index.html.');
  process.exit(1);
}

// Vérifier qu'il n'y a pas de références à __prependToUrl
if (indexContent.includes('__prependToUrl')) {
  console.error('❌ Des références à __prependToUrl ont été trouvées dans index.html.');
  process.exit(1);
}

console.log('✅ Build vérifié avec succès !');
console.log('📁 Dossier dist:', distPath);
console.log('📄 index.html:', indexPath);
console.log('📦 Assets:', assetsPath);

// Lister les fichiers dans assets
const assetsFiles = fs.readdirSync(assetsPath);
console.log('📋 Fichiers dans assets:', assetsFiles.length);
assetsFiles.forEach(file => {
  const filePath = path.join(assetsPath, file);
  const stats = fs.statSync(filePath);
  console.log(`   - ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
});

console.log('\n🚀 Le build est prêt pour le déploiement !');
