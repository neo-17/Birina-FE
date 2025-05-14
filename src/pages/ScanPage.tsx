import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, Check, Wallet } from 'lucide-react';
import MintNFTButton from '../components/MintNFTButton';
import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { baseSepolia, base } from 'viem/chains';
import { config } from '../config/config';

const ScanPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintData, setMintData] = useState(null); // Store mint transaction data
  const [network, setNetwork] = useState('baseTestnet'); // 'baseTestnet' or 'baseMainnet'

  useEffect(() => {
    if (code) {
      fetchProductByCode(code);
    }
  }, [code]);

  const fetchProductByCode = async (qrCode) => {
    try {
      const res = await axios.get(`${config.apiUrl}/api/gamosas/qr/${qrCode}`);
      setProduct(res.data.gamosa);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setError('Product not found');
    }
  };

  const WalletConnector = () => {
    const { user: walletUser, handleLogOut, primaryWallet } = useDynamicContext();

    if (walletUser && primaryWallet) {
      return (
        <div className="w-full">
          <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Connected Wallet</p>
                <p className="text-white/80 text-xs truncate max-w-[150px]">
                  {primaryWallet.address.slice(0, 6)}...{primaryWallet.address.slice(-4)}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogOut}
              className="text-white/70 text-sm hover:text-white underline"
            >
              Disconnect
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            {/* <button
              onClick={() => {
                setNetwork('baseTestnet');
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${network === 'baseTestnet'
                ? 'bg-white text-red-600'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              Base Sepolia
            </button> */}
            {/* <button
              onClick={() => {
                setNetwork('baseMainnet');
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${network === 'baseMainnet'
                ? 'bg-white text-red-600'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              Base Mainnet
            </button> */}
          </div>
          
          {/* Show mint button once wallet is connected */}
          <div className="mt-4">
            <MintNFTButton 
              productId={product?._id}
              userAddress={primaryWallet.address}
              code={code}
              network={network}
              onSuccess={(data) => {
                setMintSuccess(true);
                setMintData(data);
                nextStep(); // Move to step 5 on successful mint
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <DynamicWidget />
          <p className="text-white/70 text-sm text-center">
            Connect your wallet to claim your digital certificate
          </p>
        </div>
      </div>
    );
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-500 to-amber-600">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-white mx-auto" />
          <p className="text-white text-xl mt-4 font-light">Discovering your Gamusa...</p>
        </div>
      </div>
    );
  }

  const renderProgressBar = () => {
    const totalSteps = 5;
    return (
      <div className="absolute top-4 right-4 left-4 flex items-center gap-1 md:gap-2 max-w-md mx-auto">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 md:h-1.5 flex-1 rounded-full transition-all duration-500 ${index <= step ? 'bg-white' : 'bg-white/30'
              }`}
          />
        ))}
      </div>
    );
  };

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Connect Wallet
        return (
          <motion.div
            key="wallet"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="w-full max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to Birina</h1>
              <p className="text-white/80">Begin your heritage journey</p>
            </div>

            <button
                  onClick={nextStep}
                  className="w-full mt-6 bg-white text-red-600 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  Continue
                </button>
          </motion.div>
        );

      case 1: // Heritage Intro
        return (
          <motion.div
            key="heritage"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-red-400 to-amber-500 relative">
                <img
                  src="/Images/PBZ01025.jpg"
                  alt="Traditional Gamusa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl font-bold text-white text-center">Heritage</h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-white text-lg leading-relaxed">
                  The Gamusa is a symbol of Assamese culture and tradition, offered as a mark of respect and honor.
                  Each piece tells a story of centuries-old craftsmanship.
                </p>

                <button
                  onClick={nextStep}
                  className="w-full mt-6 bg-white text-red-600 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 2: // Artisan Story
        return (
          <motion.div
            key="artisan"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <div className="relative w-full h-48 object-cover">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">{product?.weaverName || "Lakshmi Devi"}</h3>
                  <p className="text-white/80 text-sm">Master Weaver • {product?.village || "Sualkuchi"}, Assam</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
                    15+ Years Experience
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
                    Traditional Methods
                  </div>
                </div>

                <p className="text-white text-lg leading-relaxed">
                  Your Gamusa was handcrafted by a master artisan using traditional looms and techniques
                  preserved through generations.
                </p>

                <button
                  onClick={nextStep}
                  className="w-full mt-6 bg-white text-red-600 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  View More Details
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 3: // Product Detail
        return (
          <motion.div
            key="product"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
                <div className="text-center p-4">
                  <h2 className="text-2xl font-bold text-white mb-2">Fulam Gamusa #{product?.gamosaId || '042'}</h2>
                  <p className="text-white/80">Woven: {`${product?.wentIntoTheLoom}`.slice(0, 10) || 'May 2023'}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-medium">Origin</h3>
                      <p className="text-white/80 text-sm">{`${'Latitude: '} ${product?.latitude} Longitude: ${product?.longitude}`}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-medium">Material</h3>
                      <p className="text-white/80 text-sm">100% Handspun Cotton</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full mt-6 bg-white text-red-600 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  Claim Digital Certificate
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 4: // Wallet Connect & Mint NFT
        return (
          <motion.div
            key="mint"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Secure Your Digital Certificate</h2>
                  <p className="text-white/80 mt-2">
                    Create a permanent record of your authentic Gamusa on the blockchain
                  </p>
                </div>

                <div className="bg-white/10 p-5 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Fulam Gamusa #{product?.gamosaId || '042'}</h3>
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      {network === 'baseTestnet' ? 'Base Sepolia' : 'Base Mainnet'}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-center gap-2">✅ Verified authenticity</li>
                    <li className="flex items-center gap-2">✅ Supports artisan communities</li>
                    <li className="flex items-center gap-2">✅ Digital proof of ownership</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl">
                  <WalletConnector />
                  {error && <p className="text-red-200 text-sm mt-4">{error}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5: // Success
        return (
          <motion.div
            key="success"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-xl text-center p-6">
              <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-white/80 mb-6">Your digital certificate is now secure on the blockchain</p>

              <div className="bg-white/10 p-4 rounded-xl mb-6 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-medium">Fulam Gamusa #{product?.gamosaId || '042'}</h3>
                  <span className="bg-green-500/30 text-green-100 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-green-300 rounded-full"></span>
                    Verified
                  </span>
                </div>
                <p className="text-white/60 text-xs truncate">
                Contract: {mintData.receipt.to}
                </p>
                {mintData?.tokenId && (
                <p className="text-white/60 text-xs mt-1">
                  Token ID: #{mintData.tokenId}
                </p>
                )}
                <p className="text-red/60 text-xs mt-4">Kindly, use the Token ID & Contract Address to import NFT to Your wallet address.</p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-white text-red-600 py-3 px-4 rounded-xl font-medium hover:bg-white/90 transition-colors"
              >
                Congratulations 🎉 
              </button>
              {/* Add a button to view on block explorer */}
              {mintData?.txHash && (
                <a 
                  href={`${network === 'baseMainnet' ? 
                    'https://basescan.org/tx/' : 
                    'https://sepolia.basescan.org/tx/'}${mintData.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-white/80 hover:text-white text-sm underline"
                >
                  View on Block Explorer
                </a>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Animated background bubbles
  const FloatingBubbles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => {
          const size = Math.random() * 100 + 50;
          const positionX = Math.random() * 100;
          const positionY = Math.random() * 100;
          const duration = Math.random() * 30 + 20;
          const delay = Math.random() * 10;

          return (
            <div
              key={index}
              className="absolute rounded-full bg-white/5 backdrop-blur-sm"
              style={{
                width: size,
                height: size,
                left: `${positionX}%`,
                top: `${positionY}%`,
                animation: `float ${duration}s infinite linear ${delay}s`
              }}
            />
          );
        })}
      </div>
    );
  };

  // Wrap our component in the Dynamic SDK provider
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "6e4f9fde-bf5c-4091-b709-73ac014bd394", // Replace with your Dynamic SDK environment ID
        walletConnectors: [EthereumWalletConnectors],
        evmNetworks: [baseSepolia, base],
      }}
    >
      <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-600 to-amber-500 overflow-hidden">
        <style jsx="true">{`
          @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(10px, 20px) rotate(5deg); }
            50% { transform: translate(-15px, 10px) rotate(-3deg); }
            75% { transform: translate(8px, -12px) rotate(2deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
        `}</style>

        <FloatingBubbles />
        {renderProgressBar()}

        <div className="relative z-10 w-full">
          {renderStep()}
        </div>

        {step > 0 && (
          <button
            onClick={() => navigate('/')}
            className="mt-6 text-white/80 hover:text-white text-sm underline z-10"
          >
            Explore More
          </button>
        )}
      </div>
    </DynamicContextProvider>
  );
};

export default ScanPage;