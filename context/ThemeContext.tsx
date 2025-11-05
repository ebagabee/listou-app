import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as shoppingListDB from "../database/shoppingList";
import tinycolor from "tinycolor2";

type ThemeType = {
    colors: {
        primary: string;
        primaryDisabled: string;
        negative: string;
        text: string;
        text2: string;
        text3: string;
        background: string;
        primaryGradient: readonly [string, string, string];
    };
};

const defaultTheme: ThemeType = {
    colors: {
        primary: "#FF730F",
        primaryDisabled: "#FFBA88",
        negative: "#FF5252",
        text: "#000",
        text2: "#5A5A5A",
        text3: "#00000060",
        background: "#FBFBFB",
        primaryGradient: ["#FF5900", "#FF9258", "#FF5900"],
    },
};

type ThemeContextType = {
    theme: ThemeType;
    setAppTheme: (newPrimaryColor: string) => Promise<void>;
    isLoadingTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const generateDerivedColors = (baseColor: string) => {
    const color = tinycolor(baseColor);
    const colorA = color.clone().darken(10).toHexString();
    const colorB = color.clone().lighten(10).toHexString();

    const disabledColor = color.clone().lighten(25).toHexString();

    return {
        gradient: [colorA, colorB, colorA] as const,
        disabled: disabledColor
    };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const [theme, setTheme] = useState<ThemeType>(defaultTheme);
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);

    useEffect(() => {
        async function loadTheme() {
            try {
                const savedColor = await shoppingListDB.getPreference(db, "theme_primary");

                if (savedColor) {
                    const derived = generateDerivedColors(savedColor);

                    setTheme((prevTheme) => ({
                        ...prevTheme,
                        colors: {
                            ...prevTheme.colors,
                            primary: savedColor,
                            primaryDisabled: derived.disabled,
                            primaryGradient: derived.gradient,
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

            const derived = generateDerivedColors(newPrimaryColor);

            setTheme((prevTheme) => ({
                ...prevTheme,
                colors: {
                    ...prevTheme.colors,
                    primary: newPrimaryColor,
                    primaryDisabled: derived.disabled,
                    primaryGradient: derived.gradient,
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