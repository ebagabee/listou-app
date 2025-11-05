import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as shoppingListDB from "../database/shoppingList";
import tinycolor from "tinycolor2";

const lightModeColors = {
    background: "#FBFBFB",
    text: "#000000",
    text2: "#5A5A5A",
    text3: "#00000060",
    card: "#FFFFFF",
};

const darkModeColors = {
    background: "#121212",
    text: "#FFFFFF",
    text2: "#B0B0B0",
    text3: "#FFFFFF60",
    card: "#1E1E1E",
};

type ThemeType = {
    isDark: boolean;
    colors: {
        primary: string;
        primaryDisabled: string;
        negative: string;
        text: string;
        text2: string;
        text3: string;
        background: string;
        card: string;
        primaryGradient: readonly [string, string, string];
    };
};

type ThemeContextType = {
    theme: ThemeType;
    setAppTheme: (newPrimaryColor: string) => Promise<void>;
    toggleThemeMode: () => Promise<void>;
    isLoadingTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const generateDerivedColors = (baseColor: string, isDark: boolean) => {
    const color = tinycolor(baseColor);
    const colorA = color.clone().darken(10).toHexString();
    const colorB = color.clone().lighten(10).toHexString();

    let disabledColor;
    if (isDark) {
        disabledColor = color.clone().darken(30).desaturate(50).toHexString();
    } else {
        disabledColor = color.clone().lighten(25).toHexString();
    }

    return {
        gradient: [colorA, colorB, colorA] as const,
        disabled: disabledColor
    };
};

const buildTheme = (primaryColor: string, isDark: boolean): ThemeType => {
    const derived = generateDerivedColors(primaryColor, isDark);
    const baseColors = isDark ? darkModeColors : lightModeColors;

    return {
        isDark,
        colors: {
            ...baseColors,
            primary: primaryColor,
            primaryDisabled: derived.disabled,
            primaryGradient: derived.gradient,
            negative: "#FF5252",
        },
    };
};

const defaultPrimary = "#FF730F";
const defaultTheme: ThemeType = buildTheme(defaultPrimary, false);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const db = useSQLiteContext();
    const [theme, setTheme] = useState<ThemeType>(defaultTheme);
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);

    useEffect(() => {
        async function loadTheme() {
            try {
                const [savedColor, savedMode] = await Promise.all([
                    shoppingListDB.getPreference(db, "theme_primary"),
                    shoppingListDB.getPreference(db, "theme_mode")
                ]);

                const primary = savedColor || defaultPrimary;
                const isDark = savedMode === "dark";

                setTheme(buildTheme(primary, isDark));
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
            setTheme(buildTheme(newPrimaryColor, theme.isDark));
        } catch (e) {
            console.error("Erro ao salvar cor do tema:", e);
        }
    }, [db, theme.isDark]);

    const toggleThemeMode = useCallback(async () => {
        try {
            const newModeIsDark = !theme.isDark;
            await shoppingListDB.setPreference(db, "theme_mode", newModeIsDark ? "dark" : "light");
            setTheme(buildTheme(theme.colors.primary, newModeIsDark));
        } catch (e) {
            console.error("Erro ao salvar modo do tema:", e);
        }
    }, [db, theme.isDark, theme.colors.primary]);

    const value = useMemo(() => ({
        theme,
        setAppTheme,
        toggleThemeMode,
        isLoadingTheme,
    }), [theme, setAppTheme, toggleThemeMode, isLoadingTheme]);

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