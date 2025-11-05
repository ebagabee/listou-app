import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "expo-router";
import DefaultHeader from "../../components/defaultHeader";

interface ThemeOptionProps {
  color: string;
  label: string;
}

export default function PreferencesPage() {
  const { theme, setAppTheme } = useTheme();

  const THEME_BLUE = "#3498DB";
  const THEME_ORANGE = "#FF730F";
  const THEME_PINK = "#ff3d87ff";

  const activeColor = theme.colors.primary;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <DefaultHeader back title='Preferências' settings={false} />,
    });
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background || "#f5f5f5",
      padding: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 12,
    },
    themeButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ffffff",
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "transparent",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    themeButtonActive: {
      borderColor: theme.colors.primary,
    },
    colorPreview: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 12,
    },
    themeButtonText: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.text,
    },
    activeLabel: {
      marginLeft: "auto",
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.primary,
    },
  });

  const ThemeOption = ({ color, label }: ThemeOptionProps) => {
    const isActive = activeColor === color;

    return (
      <TouchableOpacity
        style={[styles.themeButton, isActive && styles.themeButtonActive]}
        onPress={() => setAppTheme(color)}
        activeOpacity={0.8}
        disabled={isActive}
      >
        <View style={[styles.colorPreview, { backgroundColor: color }]} />
        <Text style={styles.themeButtonText}>{label}</Text>
        {isActive && (
          <Text style={styles.activeLabel}>Ativo</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Temas</Text>
        <ThemeOption color={THEME_BLUE} label="Azul" />
        <ThemeOption color={THEME_ORANGE} label="Laranja (Padrão)" />
        <ThemeOption color={THEME_PINK} label="Rosa Claro" />
      </View>
    </View>
  );
}