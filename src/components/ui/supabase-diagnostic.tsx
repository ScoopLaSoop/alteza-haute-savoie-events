import { useState, useEffect } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";
import { testConnection, clientService, devisService } from "@/lib/supabase";
import { CheckCircle, XCircle, Loader2, Database, AlertTriangle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SupabaseDiagnostic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [diagnostics, setDiagnostics] = useState<{
    hasUrl: boolean;
    hasKey: boolean;
    isDemoMode: boolean;
    connectionTest: boolean | null;
    error: string | null;
  }>({
    hasUrl: false,
    hasKey: false,
    isDemoMode: true,
    connectionTest: null,
    error: null
  });
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier la configuration au chargement
    checkConfiguration();
  }, []);

  const checkConfiguration = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    const isDemoMode = supabaseUrl.includes('temp.supabase.co') || supabaseKey === 'temp_key' || !supabaseUrl || !supabaseKey;

    setDiagnostics(prev => ({
      ...prev,
      hasUrl: !!supabaseUrl && !supabaseUrl.includes('votre-projet'),
      hasKey: !!supabaseKey && !supabaseKey.includes('votre_cle'),
      isDemoMode
    }));
  };

  const testConnectionFull = async () => {
    setIsLoading(true);
    
    try {
      const isConnected = await testConnection();
      
      if (isConnected) {
        // Test complet avec insertion de données
        const testClient = await clientService.upsertClient({
          nom: "Test",
          email: `test-${Date.now()}@example.com`,
          telephone: "0123456789"
        });

        if (testClient) {
          const testDevis = await devisService.createDemandeDevis({
            client_id: testClient.id,
            type_evenement: "Test de connexion",
            services_demandes: ["Test"],
            message: "Test automatique de connexion",
            statut: "nouveau"
          });

          setDiagnostics(prev => ({
            ...prev,
            connectionTest: !!testDevis,
            error: testDevis ? null : "Erreur lors de la création du devis de test"
          }));
        } else {
          setDiagnostics(prev => ({
            ...prev,
            connectionTest: false,
            error: "Erreur lors de la création du client de test"
          }));
        }
      } else {
        setDiagnostics(prev => ({
          ...prev,
          connectionTest: false,
          error: "Impossible de se connecter à Supabase"
        }));
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      setDiagnostics(prev => ({
        ...prev,
        connectionTest: false,
        error: error instanceof Error ? error.message : String(error)
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const copyEnvTemplate = () => {
    const template = `# Configuration Supabase pour ALTÉZA EVEN'T
# Remplacez ces valeurs par vos vraies clés Supabase

# URL de votre projet Supabase (trouvable dans Settings > API)
VITE_SUPABASE_URL=https://votre-projet.supabase.co

# Clé API anonyme de votre projet Supabase (trouvable dans Settings > API)
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme_ici`;

    navigator.clipboard.writeText(template);
    toast({
      title: "Template copié !",
      description: "Collez ce contenu dans un fichier .env.local à la racine du projet"
    });
  };

  const StatusBadge = ({ condition, successText, errorText }: {
    condition: boolean | null;
    successText: string;
    errorText: string;
  }) => (
    condition === null ? (
      <Badge variant="secondary">Non testé</Badge>
    ) : condition ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        {successText}
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />
        {errorText}
      </Badge>
    )
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Diagnostic Supabase
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Configuration */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Configuration</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">URL Supabase configurée</span>
                <StatusBadge 
                  condition={diagnostics.hasUrl} 
                  successText="Configurée" 
                  errorText="Manquante" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Clé API configurée</span>
                <StatusBadge 
                  condition={diagnostics.hasKey} 
                  successText="Configurée" 
                  errorText="Manquante" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Mode de fonctionnement</span>
                {diagnostics.isDemoMode ? (
                  <Badge variant="secondary">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Mode Démo
                  </Badge>
                ) : (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Production
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Test de connexion */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Test de connexion</h3>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Connexion à la base de données</span>
              <StatusBadge 
                condition={diagnostics.connectionTest} 
                successText="Connectée" 
                errorText="Échec" 
              />
            </div>

            <Button 
              onClick={testConnectionFull} 
              disabled={isLoading || diagnostics.isDemoMode}
              variant="outline"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Test en cours...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Tester la connexion complète
                </>
              )}
            </Button>
          </div>

          {/* Erreurs */}
          {diagnostics.error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Erreur détectée:</strong> {diagnostics.error}
              </AlertDescription>
            </Alert>
          )}

          {/* Instructions */}
          {diagnostics.isDemoMode && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Configuration requise:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                  <li>Créez un projet sur <a href="https://supabase.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">supabase.com</a></li>
                  <li>Allez dans Settings → API</li>
                  <li>Copiez l'URL du projet et la clé "anon public"</li>
                  <li>Créez un fichier <code>.env.local</code> à la racine du projet</li>
                  <li>Redémarrez votre serveur de développement</li>
                </ol>
                
                <Button 
                  onClick={copyEnvTemplate}
                  variant="outline" 
                  size="sm"
                  className="mt-3"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copier le template .env.local
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Informations de debug */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Informations de debug</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
            {JSON.stringify({
              url: import.meta.env.VITE_SUPABASE_URL ? 'Configurée' : 'Non configurée',
              key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurée' : 'Non configurée',
              isDemoMode: diagnostics.isDemoMode,
              timestamp: new Date().toISOString()
            }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};
