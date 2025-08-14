# Configuration Supabase pour ALTÉZA EVEN'T

## 📋 Variables d'environnement à créer

Créez un fichier `.env.local` à la racine du projet avec :

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🗄️ Schéma de base de données SQL

Exécutez ces commandes SQL dans votre dashboard Supabase :

```sql
-- Table des clients
CREATE TABLE clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des demandes de devis
CREATE TABLE demandes_devis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    type_evenement VARCHAR(100) NOT NULL,
    date_evenement DATE,
    lieu_evenement VARCHAR(255),
    nombre_invites INTEGER,
    budget_estime VARCHAR(50),
    services_demandes TEXT[] NOT NULL DEFAULT '{}',
    message TEXT,
    statut VARCHAR(20) DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'en_cours', 'traite', 'archive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_demandes_devis_client_id ON demandes_devis(client_id);
CREATE INDEX idx_demandes_devis_statut ON demandes_devis(statut);
CREATE INDEX idx_demandes_devis_created_at ON demandes_devis(created_at);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demandes_devis_updated_at BEFORE UPDATE ON demandes_devis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Politiques RLS (Row Level Security) - optionnel pour sécurité avancée
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandes_devis ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion et la lecture (à adapter selon vos besoins)
CREATE POLICY "Allow public insert" ON clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON clients FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON clients FOR UPDATE USING (true);

CREATE POLICY "Allow public insert" ON demandes_devis FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON demandes_devis FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON demandes_devis FOR UPDATE USING (true);
```

## 🚀 Étapes de configuration

1. **Créer un projet Supabase** sur https://supabase.com
2. **Exécuter le SQL** ci-dessus dans l'éditeur SQL
3. **Récupérer les clés** dans Settings > API
4. **Créer le fichier .env.local** avec vos clés
5. **Redémarrer le serveur** de développement

## 📊 Structure des données

### Table `clients`
- `id` : UUID unique
- `nom` : Nom du client (requis)
- `prenom` : Prénom du client
- `email` : Email unique (requis)
- `telephone` : Numéro de téléphone
- `created_at` / `updated_at` : Timestamps automatiques

### Table `demandes_devis`
- `id` : UUID unique
- `client_id` : Référence vers le client
- `type_evenement` : Type d'événement (requis)
- `date_evenement` : Date prévue de l'événement
- `lieu_evenement` : Lieu de l'événement
- `nombre_invites` : Nombre d'invités
- `budget_estime` : Budget estimé
- `services_demandes` : Array des services demandés
- `message` : Message libre du client
- `statut` : nouveau | en_cours | traite | archive
- `created_at` / `updated_at` : Timestamps automatiques
