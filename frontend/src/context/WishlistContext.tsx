import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
    wishlist: string[]; // Store asset titles or IDs
    addToWishlist: (assetTitle: string) => void;
    removeFromWishlist: (assetTitle: string) => void;
    isWishlisted: (assetTitle: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<string[]>(() => {
        // Load from localStorage on initial render
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (assetTitle: string) => {
        if (!wishlist.includes(assetTitle)) {
            setWishlist([...wishlist, assetTitle]);
        }
    };

    const removeFromWishlist = (assetTitle: string) => {
        setWishlist(wishlist.filter((title) => title !== assetTitle));
    };

    const isWishlisted = (assetTitle: string) => {
        return wishlist.includes(assetTitle);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};