import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Mode démo - désactiver Supabase temporairement
const isDemoMode = supabaseUrl.includes('temp.supabase.co') || supabaseKey === 'temp_key' || !supabaseUrl || !supabaseKey;

// Log pour debug
console.log('🔧 Supabase Config:', { 
  url: supabaseUrl, 
  hasKey: !!supabaseKey, 
  isDemoMode 
});

// Créer le client Supabase seulement si les variables sont définies
export const supabase = isDemoMode ? null : createClient(supabaseUrl, supabaseKey);

// Types pour la base de données
export interface Client {
  id?: string;
  nom: string;
  prenom?: string;
  email: string;
  telephone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DemandeDevis {
  id?: string;
  client_id?: string;
  type_evenement: string;
  date_evenement?: string;
  lieu_evenement?: string;
  nombre_invites?: number;
  budget_estime?: string;
  services_demandes: string[];
  message?: string;
  statut: 'nouveau' | 'en_cours' | 'traite' | 'archive';
  created_at?: string;
  updated_at?: string;
  // Relations
  client?: Client;
}

// Fonctions utilitaires pour les clients
export const clientService = {
  // Créer ou récupérer un client
  async upsertClient(clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client | null> {
    // Mode démo - simuler le succès
    if (isDemoMode || !supabase) {
      console.log('Mode démo - Client simulé:', clientData);
      return {
        id: 'demo-client-' + Date.now(),
        ...clientData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    try {
      // Vérifier si le client existe déjà par téléphone (plus fiable que email)
      let existingClient = null;
      
      if (clientData.telephone) {
        const { data } = await supabase
          .from('clients')
          .select('*')
          .eq('telephone', clientData.telephone)
          .single();
        existingClient = data;
      }
      
      // Si pas trouvé par téléphone, chercher par email
      if (!existingClient && clientData.email) {
        const { data } = await supabase
          .from('clients')
          .select('*')
          .eq('email', clientData.email)
          .single();
        existingClient = data;
      }

      if (existingClient) {
        // Mettre à jour les informations du client existant
        const { data, error } = await supabase
          .from('clients')
          .update({
            nom: clientData.nom,
            prenom: clientData.prenom,
            telephone: clientData.telephone,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingClient.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Créer un nouveau client
        const { data, error } = await supabase
          .from('clients')
          .insert([clientData])
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error('Erreur lors de la création/mise à jour du client:', error);
      return null;
    }
  },

  // Récupérer tous les clients
  async getAllClients(): Promise<Client[]> {
    if (isDemoMode || !supabase) {
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
      return [];
    }
  }
};

// Fonctions utilitaires pour les demandes de devis
export const devisService = {
  // Créer une nouvelle demande de devis
  async createDemandeDevis(devisData: Omit<DemandeDevis, 'id' | 'created_at' | 'updated_at'>): Promise<DemandeDevis | null> {
    // Mode démo - simuler le succès
    if (isDemoMode || !supabase) {
      console.log('Mode démo - Devis simulé:', devisData);
      return {
        id: 'demo-devis-' + Date.now(),
        ...devisData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    try {
      const { data, error } = await supabase
        .from('demandes_devis')
        .insert([{
          ...devisData,
          statut: 'nouveau'
        }])
        .select(`
          *,
          client:clients(*)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la demande de devis:', error);
      return null;
    }
  },

  // Récupérer toutes les demandes de devis
  async getAllDemandesDevis(): Promise<DemandeDevis[]> {
    if (isDemoMode || !supabase) {
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('demandes_devis')
        .select(`
          *,
          client:clients(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes de devis:', error);
      return [];
    }
  },

  // Mettre à jour le statut d'une demande de devis
  async updateStatutDevis(id: string, statut: DemandeDevis['statut']): Promise<boolean> {
    if (isDemoMode || !supabase) {
      return true;
    }
    
    try {
      const { error } = await supabase
        .from('demandes_devis')
        .update({ 
          statut,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      return false;
    }
  }
};

// Fonction pour tester la connexion
export const testConnection = async (): Promise<boolean> => {
  if (isDemoMode || !supabase) {
    return false;
  }
  
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('count')
      .limit(1);

    return !error;
  } catch (error) {
    console.error('Erreur de connexion à Supabase:', error);
    return false;
  }
};
