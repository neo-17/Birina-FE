import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, AlertCircle, LogOut, QrCode, Wallet, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import ProductForm from '../../admin/ProductForm';
import { api } from '../../libs/utils';

const CONTRACT_ADDRESS = '0xF14236C39ce4598DF38397EF62A6bdAbC5909Bd7'

// Type definitions
interface QR {
  _id: string;
  code: string;
  claimed: boolean;
  claimedBy: string;
  claimedNFTUrl: string | null;
  mintedTokenId: string | null;
}

interface Gamosa {
  _id: string;
  gamosaId: string;
  weaverName: string;
  gamosaType: string;
  gamosaSize: string;
  village: string;
  subdivision: string;
  district: string;
  latitude: string;
  longitude: string;
  wentIntoTheLoom: string;
  weaverImageUrl: string;
  ipfsUrl: string;
  qrCodes: QR[];
  contractAddress: string | null;
}

interface Admin {
  id: string;
  username: string;
  role: string;
}

const ProductsPage = () => {
  const navigate = useNavigate();
  const [gamosas, setGamosas] = useState<Gamosa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);

  // Authentication check on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch gamosas when admin is authenticated
  useEffect(() => {
    if (currentAdmin) {
      fetchGamosas();
    }
  }, [currentAdmin]);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Check token expiration
      if (payload.exp * 1000 < Date.now()) {
        handleLogout();
        return;
      }

      setCurrentAdmin({
        id: payload.id,
        username: payload.username,
        role: payload.role
      });

      // Set up axios interceptor for authenticated requests
      api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      // Handle unauthorized responses
      api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            handleLogout();
          }
          return Promise.reject(error);
        }
      );
    } catch (error) {
      handleLogout();
      console.error('Error decoding token:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const fetchGamosas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get('/gamosas');
 
      setGamosas(res.data);
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGamosa = async (gamosaData: Omit<Gamosa, '_id'>) => {
    try {
      setError(null);
      const res = await api.post('/gamosas', gamosaData);
      setGamosas((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (error) {
      setError('Failed to create product. Please try again.');
      console.error('Error creating product:', error);
    }
  };

  const deleteGamosa = async (id: string) => {
    try {
      setError(null);
      await api.delete(`/gamosas/${id}`);
      setGamosas((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      setError('Failed to delete product. Please try again.');
      console.error('Error deleting product:', error);
    }
  };

  const fetchQRDetails = async (gamosaId: string) => {
    try {
      setError(null);
      const res = await api.get(`/qr/${gamosaId}`);
      setGamosas(prev => 
        prev.map(g => 
          g._id === gamosaId ? { ...g, qrCodes: res.data } : g
        )
      );
    } catch (error) {
      setError('Failed to fetch QR details. Please try again.');
      console.error('Error fetching QR details:', error);
    }
  };

  // Loading state
  if (!currentAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Gamosas</h1>
          <p className="text-sm text-gray-500">
            Logged in as <span className="font-medium">{currentAdmin.username}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            {showForm ? 'Cancel' : 'Add Gamosa'}
          </Button>
          <Button
            variant="outline"
            onClick={fetchGamosas}
            className="flex items-center gap-2"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Product Form */}
      {showForm && (
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Add New Gamosa</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm onCreate={createGamosa} />
          </CardContent>
        </Card>
      )}

      {/* Gamosas List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Gamosas List</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : gamosas.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No gamosas found. Add one to get started.
            </div>
          ) : (
            <div className="space-y-6 divide-y">
              {gamosas.map((gamosa) => (
                <div key={gamosa._id} className="p-6 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {gamosa.weaverImageUrl ? (
                          <img 
                            src={gamosa.weaverImageUrl} 
                            alt={gamosa.weaverName} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            N/A
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{gamosa.gamosaId}</h3>
                        <p className="text-sm text-gray-500">by {gamosa.weaverName}</p>
                      </div>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <a href={`https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:underline">
                          View Contract
                        </a>
                      </Badge>
                    </div>
                  </div>
                  <Separator className="mb-4" />

                  <Tabs defaultValue="details">
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="qrcodes">
                        QR Codes ({gamosa.qrCodes.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Type:</span>
                            <span>{gamosa.gamosaType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Size:</span>
                            <span>{gamosa.gamosaSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Village:</span>
                            <span>{gamosa.village}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Subdivision:</span>
                            <span>{gamosa.subdivision}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">District:</span>
                            <span>{gamosa.district}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Location:</span>
                            <span>{gamosa.latitude}, {gamosa.longitude}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Went into Loom:</span>
                            <span>{gamosa.wentIntoTheLoom}</span>
                          </div>
                          {gamosa.contractAddress && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Contract:</span>
                              <span className="truncate max-w-xs" title={gamosa.contractAddress}>
                                {gamosa.contractAddress.substring(0, 8)}...{gamosa.contractAddress.substring(gamosa.contractAddress.length - 6)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="qrcodes">
                    {gamosa.qrCodes.length > 0 ? (
                        <div className="space-y-2 text-sm">
                          {gamosa.qrCodes.map((qr) => (
                            <div key={qr._id} className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="font-mono">{qr.code}</span>
                              <div className="flex items-center gap-3">
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => window.open(`http://localhost:4000/api/gamosas/qr-image/${qr.code}`, '_blank')}
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                >
                                  <QrCode className="h-3 w-3" />
                                  View QR
                                </Button>
                                <Badge variant={qr.claimed ? "default" : "outline"}>
                                  {qr.claimed ? 'Claimed' : 'Unclaimed'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <Button 
                            onClick={() => fetchQRDetails(gamosa._id)}
                            className="flex items-center gap-2 mx-auto"
                            size="sm"
                            variant="outline"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Load QR Details
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteGamosa(gamosa._id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 ml-auto flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;