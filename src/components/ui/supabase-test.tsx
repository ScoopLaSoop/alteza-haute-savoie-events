import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { testConnection, clientService, devisService } from "@/lib/supabase";
import { CheckCircle, XCircle, Loader2, Database } from "lucide-react";

export const SupabaseTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<{
    connection: boolean;
    clientsCount: number;
    devisCount: number;
  } | null>(null);

  const runTests = async () => {
    setIsLoading(true);
    setConnectionStatus('idle');

    try {
      // Test de connexion
      const isConnected = await testConnection();
      
      if (!isConnected) {
        throw new Error("Impossible de se connecter à Supabase");
      }

      // Récupérer le nombre de clients et de devis
      const clients = await clientService.getAllClients();
      const devis = await devisService.getAllDemandesDevis();

      setTestResults({
        connection: true,
        clientsCount: clients.length,
        devisCount: devis.length
      });

      setConnectionStatus('success');
    } catch (error) {
      console.error('Erreur lors des tests Supabase:', error);
      setConnectionStatus('error');
      setTestResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Test Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runTests} 
          disabled={isLoading}
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
              Tester la connexion
            </>
          )}
        </Button>

        {connectionStatus !== 'idle' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connexion Supabase</span>
              {connectionStatus === 'success' ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connecté
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="w-3 h-3 mr-1" />
                  Erreur
                </Badge>
              )}
            </div>

            {testResults && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Clients en base:</span>
                  <span className="font-medium">{testResults.clientsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Demandes de devis:</span>
                  <span className="font-medium">{testResults.devisCount}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>Ce composant teste la connexion à Supabase et affiche les statistiques.</p>
          <p className="mt-1">
            <strong>Note:</strong> Assurez-vous d'avoir configuré vos variables d'environnement dans <code>.env.local</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
