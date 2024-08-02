
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedAuth = localStorage.getItem('authToken');
        if (savedAuth) {
            setIsAuth(true);
        }
        setLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};






/*import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Definiera typer för AuthContext
interface AuthContextType {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

// Skapa en AuthContext med standardvärden
export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {}
});

// AuthProvider komponent för att hantera global autentiseringstillstånd
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};*/
