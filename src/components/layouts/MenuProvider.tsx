import { createContext, useContext, useState } from 'react';

interface MenuContextValue {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within MenuProvider');
  }
  return context;
};
