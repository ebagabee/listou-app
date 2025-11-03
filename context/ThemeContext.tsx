import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as shoppingListDB from "../database/shoppingList"

const defaultTheme = {
    colors: {
        primary: "#FF730F",
        negative: "#FF5252",
        text: "#000",
        text2: "#5A5A5A",
        text3: "#00000060",
        background: "#FBFBFB",
        primaryGradient: ["#FF5900", "#FF9258", "#FF5900"] as const,
    },
};

type ThemeType = typeof defaultTheme;

type ThemeContextType = {
    theme: ThemeType;
    setAppTheme: (newPrimaryColor: string) => Promise<void>;
    isLoadingTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const [theme, setTheme] = useState(defaultTheme);
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);

    useEffect(() => {
        async function loadTheme() {
            try {
                const savedColor = await shoppingListDB.getPreference(db, "theme_primary");

                if (savedColor) {
                    setTheme((prevTheme) => ({
                        ...prevTheme,
                        colors: {
                            ...prevTheme.colors,
                            primary: savedColor,
                        },
                    }));
                }
            } catch (e) {
                console.error("Erro ao carregar tema:", e);
            } finally {
                setIsLoadingTheme(false);
            }
        }

        loadTheme();
    }, [db]);

    const setAppTheme = useCallback(async (newPrimaryColor: string) => {
        try {
            await shoppingListDB.setPreference(db, "theme_primary", newPrimaryColor);

            setTheme((prevTheme) => ({
                ...prevTheme,
                colors: {
                    ...prevTheme.colors,
                    primary: newPrimaryColor,
                },
            }));
        } catch (e) {
            console.error("Erro ao salvar tema:", e);
        }
    }, [db]);

    const value = useMemo(() => ({
        theme,
        setAppTheme,
        isLoadingTheme,
    }), [theme, setAppTheme, isLoadingTheme]);

    if (isLoadingTheme) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
};