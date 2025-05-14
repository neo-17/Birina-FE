import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";

interface Claims {
  _id: string;
  code: string;
  claimedAt: boolean;
  gamosa: string;
  claimedNFTUrl: string;
  tokenId: string;
}

interface UserProfile {
  username: string;
  name: string;
  nfts: Claims[];
}

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [transferringId, setTransferringId] = useState<string | null>(null);
  const [transferResult, setTransferResult] = useState({
    success: false,
    message: "",
    nftId: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/profile/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. Please login again.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleTransfer = async (nftId: string) => {
    if (!transferAddress || !transferAddress.startsWith("0x")) {
      setTransferResult({
        success: false,
        message: "Please enter a valid Ethereum address",
        nftId
      });
      return;
    }

    setTransferringId(nftId);
    
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        `http://localhost:4000/api/nft/transfer/${nftId}`,
        { destinationAddress: transferAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update local state to show NFT is no longer transferable
      setProfile(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          nfts: prev.nfts.map(nft => 
            nft.id === nftId ? { ...nft, transferable: false } : nft
          )
        };
      });
      
      setTransferResult({
        success: true,
        message: "NFT successfully transferred!",
        nftId
      });
    } catch (err) {
      setTransferResult({
        success: false,
        message: "Transfer failed. Please try again.",
        nftId
      });
    } finally {
      setTransferringId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-xl text-red-400">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center flex-col">
        <p className="text-xl text-red-500 mb-4">{error}</p>
        <Button onClick={() => navigate("/login")} className="bg-red-500 hover:bg-red-600">
          Return to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome, <span className="text-red-400">{profile?.name || username}</span>
          </h1>
          <div className="space-x-4">
            <Button onClick={() => navigate("/")} className="bg-gray-700 hover:bg-gray-600">
              Home
            </Button>
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Authentic Gamosa Collection</h2>
          
          {profile?.nfts && profile.nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.nfts.map((nft) => (
                <div key={nft._id} className="bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={nft.claimedNFTUrl || "/placeholder-gamosa.jpg"}
                    alt={nft.claimedNFTUrl}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    {/* <h3 className="text-xl font-medium text-white mb-2">{nft.tokenId}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-300">
                        <span className="text-red-400">Creator:</span> {nft.creator}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="text-red-400">Blockchain:</span> {nft.blockchain}
                      </p>
                      // <p className="text-sm text-gray-300">
                      //   <span className="text-red-400">Token ID:</span> #{nft.tokenId}
                      // </p> */}
                      <p className="text-sm text-gray-300 truncate">
                        <span className="text-red-400">Smart Account:</span> {nft.gamosa.substring(0, 8)}...
                      </p>
                    </div>
                    
                    {nft.transferable ? (
                      <div>
                        <p className="text-xs text-gray-400 mb-2">
                          Transfer to your personal wallet (one-time only)
                        </p>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Enter ETH address (0x...)"
                            className="flex-1 p-2 text-sm border border-gray-600 bg-gray-800 text-white rounded-md"
                            onChange={(e) => setTransferAddress(e.target.value)}
                          />
                          <Button
                            onClick={() => handleTransfer(nft._id)}
                            disabled={transferringId === nft._id}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm"
                          >
                            {transferringId === nft._id ? "..." : "Transfer"}
                          </Button>
                        </div>
                        
                        {transferResult.nftId === nft._id && (
                          <p className={`text-xs mt-2 ${transferResult.success ? "text-green-400" : "text-red-400"}`}>
                            {transferResult.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-800 p-2 rounded-md border border-gray-600">
                        <p className="text-xs text-gray-400">
                          This NFT has been transferred to your wallet and is now frozen on the blockchain.
                        </p>
                      </div>
                    )}
                  </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 mb-4">You don't have any Gamosa NFTs yet.</p>
              <Button onClick={() => navigate("/")} className="bg-red-500 hover:bg-red-600">
                Explore Collection
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;