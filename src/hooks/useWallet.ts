import { useEffect, useState } from "react";

const KEY = "mm.wallet.address";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) setAddress(stored);
  }, []);

  const connect = (addr: string) => {
    localStorage.setItem(KEY, addr);
    setAddress(addr);
  };
  const disconnect = () => {
    localStorage.removeItem(KEY);
    setAddress(null);
  };

  return { address, connect, disconnect, isConnected: !!address };
}
