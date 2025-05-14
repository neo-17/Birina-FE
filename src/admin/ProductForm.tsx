/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Box, Calendar } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate } from 'react-router-dom';

interface ProductFormProps {
  onCreate: (gamosaData: GamosaData) => void;
}

interface QR {
  _id: string;
  code: string;
  claimed: boolean;
  claimedBy: string;
  mintedTokenId: string;
}

interface GamosaData {
  gamosaId: string;
  type: string;
  symbol: string;
  time: Date;
  district: string;
  subdivision: string;
  cluster: string;
  // latitude: string;
  // longitude: string;
  ipfsUrl: string;
  contractAddress?: string;
  qrCodes: QR[];
}

const PRODUCT_TYPES = [
  'simple',
  'thik thak',
  'borhiya',
];

const DISTRICT = [
  'Nagaon',
  'Jorhat',
  'Golaghat',
]

const SUBDIVISION = [
  'Panikhaiti',
  'Jail Road',
  'Merapani',
]

const CLUSTER = [
  'Nagaon 1',
  'Jorhat 1',
  'Golaghat 1',
]

const ProductForm: React.FC<ProductFormProps> = ({ onCreate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GamosaData>({
    gamosaId: '',
    type: '',
    symbol: '',
    time: new Date(),
    district: '',
    subdivision: '',
    cluster: '',
    // latitude: '',
    // longitude: '',
    ipfsUrl: '',
    qrCodes: [],
  });

  const handleChange = (field: keyof GamosaData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem('adminToken');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      // Call the onCreate function with the form data
      await onCreate(formData);
      
      // Reset form after successful creation
      setFormData({
        gamosaId: '',
        type: '',
        symbol: '',
        time: new Date(),
        district: '',
        subdivision: '',
        cluster: '',
        // latitude: '',
        // longitude: '',
        ipfsUrl: '',
        qrCodes: [],
      });
    } catch (error) {
      console.error('Error creating product:', error);
      // If token is invalid/expired, redirect to login
      if (error) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Details Section */}
          <div className="space-y-2">
            <Label htmlFor="symbol">Gamosa NFT Symbol</Label>
            <div className="relative">
              <Box className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="symbol"
                className="pl-8"
                placeholder="Enter Gamosa NFT symbol"
                value={formData.symbol}
                onChange={(e) => handleChange('symbol', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Gamosa Type</Label>
            <Select 
              value={formData.type}
              onValueChange={(value: any) => handleChange('type', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Gamosa type" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_TYPES.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        {/* Time Section */}
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="time"
                className="pl-8"
                placeholder="Enter time"
                type="datetime-local"
                value={formData.time.toString()}
                onChange={(e) => handleChange('time', e.target.value)}
                required
              />
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">Enter District</Label>
            <Select 
              value={formData.district}
              onValueChange={(value: any) => handleChange('district', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Enter District" />
              </SelectTrigger>
              <SelectContent>
                {DISTRICT.map((district) => (
                  <SelectItem key={district} value={district.toLowerCase()}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subdivision">Enter Sub-Division</Label>
            <Select 
              value={formData.subdivision}
              onValueChange={(value: any) => handleChange('subdivision', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Enter Sub-Division" />
              </SelectTrigger>
              <SelectContent>
                {SUBDIVISION.map((sub) => (
                  <SelectItem key={sub} value={sub.toLowerCase()}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cluster">Enter Cluster</Label>
            <Select 
              value={formData.cluster}
              onValueChange={(value: any) => handleChange('cluster', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Enter Cluster" />
              </SelectTrigger>
              <SelectContent>
                {CLUSTER.map((cluster) => (
                  <SelectItem key={cluster} value={cluster.toLowerCase()}>
                    {cluster}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <div className="relative">
                <Navigation className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="latitude"
                  className="pl-8"
                  placeholder="Enter latitude"
                  value={formData.latitude}
                  onChange={(e) => handleChange('latitude', e.target.value)}
                  required
                />
              </div>
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <div className="relative">
                <Navigation className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="longitude"
                  className="pl-8"
                  placeholder="Enter longitude"
                  value={formData.longitude}
                  onChange={(e) => handleChange('longitude', e.target.value)}
                  required
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" className="min-w-[120px]">
          Create Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;