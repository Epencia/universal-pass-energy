import { useState,useContext,createContext } from 'react';
// Création du contexte
export const AppContext = createContext();
// Fournisseur du contexte (englobe toute l'application)
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Variable globale partagée

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
   );
};


