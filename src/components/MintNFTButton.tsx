import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const MintNFTButton = ({ productId, userAddress, code, network, onSuccess }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(null);

  const handleMint = async () => {
    setIsMinting(true);
    setError(null);
    
    try {
      // Get the auth token from localStorage where it's typically stored after login
      const token = localStorage.getItem('authToken');
      
      // Make the API call with proper authorization header
      const response = await axios.post(
        'http://localhost:4000/api/nft/mint', 
        {
          productId,
          walletAddress: userAddress,
          qrCode: code,
          network
        },
        {
          headers: {
            'Authorization': `Bearer ${token}` // Properly format the token with Bearer prefix
          }
        }
      );
      
      setIsMinting(false);
      
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      console.error('Minting error:', err);
      setError(err.response?.data?.message || 'Failed to mint NFT');
      setIsMinting(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={isMinting}
      className={`w-full py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center ${
        isMinting 
          ? 'bg-white/50 text-red-600/50' 
          : 'bg-white text-red-600 hover:bg-white/90'
      }`}
    >
      {isMinting ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          Minting Your NFT...
        </>
      ) : (
        'Mint Your NFT'
      )}
      
      {error && (
        <div className="mt-2 text-red-200 text-sm text-center">
          {error}
        </div>
      )}
    </button>
  );
};

export default MintNFTButton;