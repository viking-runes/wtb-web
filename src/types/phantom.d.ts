interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: any) => void;
  isConnected: boolean;
}

interface Window {
  solana?: PhantomProvider;
}
