-- ==============================================
-- TABLES POUR ALTÉZA EVEN'T
-- À copier-coller dans SQL Editor de Supabase
-- ==============================================

-- 1. Table des clients
CREATE TABLE clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des demandes de devis
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

-- 3. Index pour les performances
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_demandes_devis_client_id ON demandes_devis(client_id);
CREATE INDEX idx_demandes_devis_statut ON demandes_devis(statut);
CREATE INDEX idx_demandes_devis_created_at ON demandes_devis(created_at);

-- 4. Fonction pour updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Triggers pour updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demandes_devis_updated_at BEFORE UPDATE ON demandes_devis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Politiques de sécurité (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandes_devis ENABLE ROW LEVEL SECURITY;

-- Permettre l'accès public (à adapter selon vos besoins)
CREATE POLICY "Allow public access" ON clients FOR ALL USING (true);
CREATE POLICY "Allow public access" ON demandes_devis FOR ALL USING (true);

-- ==============================================
-- PRÊT ! Cliquez sur "Run" pour créer les tables
-- ==============================================
