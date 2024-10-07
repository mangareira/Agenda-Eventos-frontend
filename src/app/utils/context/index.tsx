import { createContext, useContext, useState, ReactNode } from 'react';

// Definir os tipos do contexto
interface SidebarContextType {
    mobile: boolean;
    setMobile: (mobile: boolean) => void;
}

// Criar o contexto com um valor inicial "placeholder"
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Definir o provider do contexto
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [mobile, setMobile] = useState(false);

    return (
        <SidebarContext.Provider value={{ mobile, setMobile }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Hook customizado para usar o contexto
export const useMobile = (): SidebarContextType => {
    const context = useContext(SidebarContext);

    // Garantir que o contexto esteja disponível, caso contrário, lançar erro
    if (!context) {
        throw new Error('useSidebar deve ser usado dentro de um SidebarProvider');
    }

    return context;
};
