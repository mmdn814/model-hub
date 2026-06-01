import React, { createContext, useContext, useState, useEffect } from "react";

export type AssetType = "image" | "video" | "audio";

export interface Asset {
  id: string;
  type: AssetType;
  url: string;
  name: string;
  createdAt: number;
  size?: number;
}

interface AssetContextType {
  hasSignedAgreement: boolean;
  signAgreement: () => void;
  assets: Asset[];
  addAsset: (asset: Omit<Asset, "id" | "createdAt">) => Promise<Asset>;
  updateAsset: (id: string, newName: string) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export function AssetProvider({ children }: { children: React.ReactNode }) {
  const [hasSignedAgreement, setHasSignedAgreement] = useState(() => {
    return localStorage.getItem("hasSignedSeedanceAgreement_v7") === "true";
  });

  const [assets, setAssets] = useState<Asset[]>(() => {
    const stored = localStorage.getItem("seedanceAssets_v7");
    if (stored) return JSON.parse(stored);
    
    return [
      {
        id: "asset-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&q=80",
        name: "66_AICG_group",
        createdAt: Date.now() - 100000,
        size: 2500000
      },
      {
        id: "asset-2",
        type: "video",
        url: "https://fake-storage/sample-vid.mp4",
        name: "81_AICG_group",
        createdAt: Date.now() - 200000,
        size: 15400000
      },
      {
        id: "asset-3",
        type: "audio",
        url: "https://fake-storage/sample-audio.mp3",
        name: "Audio_recorded_01_group",
        createdAt: Date.now() - 400000,
        size: 4200000
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("hasSignedSeedanceAgreement_v7", String(hasSignedAgreement));
  }, [hasSignedAgreement]);

  useEffect(() => {
    localStorage.setItem("seedanceAssets_v7", JSON.stringify(assets));
  }, [assets]);

  const signAgreement = () => {
    setHasSignedAgreement(true);
  };

  const addAsset = async (assetData: Omit<Asset, "id" | "createdAt">): Promise<Asset> => {
    // Simulate Adoraod API call to register asset
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newAsset: Asset = {
          ...assetData,
          id: `asset-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: Date.now(),
        };
        setAssets((prev) => [newAsset, ...prev]);
        resolve(newAsset);
      }, 800);
    });
  };

  const updateAsset = async (id: string, newName: string): Promise<void> => {
    setAssets((prev) => prev.map((asset) => asset.id === id ? { ...asset, name: newName } : asset));
  };

  const deleteAsset = async (id: string): Promise<void> => {
    // Simulate Adoraod API call to delete asset
    return new Promise((resolve) => {
      setTimeout(() => {
        setAssets((prev) => prev.filter((asset) => asset.id !== id));
        resolve();
      }, 600);
    });
  };

  return (
    <AssetContext.Provider value={{ hasSignedAgreement, signAgreement, assets, addAsset, updateAsset, deleteAsset }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error("useAssets must be used within an AssetProvider");
  }
  return context;
}
