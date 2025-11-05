import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "expo-router";
import DefaultHeader from "../../components/defaultHeader";

interface ThemeOptionProps {
  color: string;
  label: string;
}

export default function PreferencesPage() {
  const { theme, setAppTheme, toggleThemeMode } = useTheme();

  const THEME_BLUE = "#3498DB";
  const THEME_ORANGE = "#FF730F";
  const THEME_PINK = "#ff6d85ff";

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
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 24,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 16,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    themeButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 12,
      marginVertical: 4,
    },
    themeButtonActive: {
      backgroundColor: theme.isDark ? "#333333" : "#F0F0F0",
    },
    colorPreview: {
      width: 28,
      height: 28,
      borderRadius: 14,
      marginRight: 12,
      borderWidth: 2,
      borderColor: theme.colors.card,
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
    rowOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      borderRadius: 12,
    },
  });

  const ThemeOption = ({ color, label }: ThemeOptionProps) => {
    const isActive = activeColor === color;

    return (
      <TouchableOpacity
        style={[styles.themeButton, isActive && styles.themeButtonActive]}
        onPress={() => setAppTheme(color)}
        activeOpacity={0.7}
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.card}>
            <View style={styles.rowOption}>
              <Text style={styles.themeButtonText}>Modo Escuro</Text>
              <Switch
                value={theme.isDark}
                onValueChange={toggleThemeMode}
                trackColor={{ false: "#767577", true: theme.colors.primaryDisabled }}
                thumbColor={theme.isDark ? theme.colors.primary : "#f4f3f4"}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cor Principal</Text>
          <View style={styles.card}>
            <ThemeOption color={THEME_BLUE} label="Azul" />
            <ThemeOption color={THEME_PINK} label="Rosa" />
            <ThemeOption color={THEME_ORANGE} label="Laranja (Padrão)" />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}