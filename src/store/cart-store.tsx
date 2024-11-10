import { create } from 'zustand';

type CartStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCartStore = create<CartStore>((set) => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    };
});