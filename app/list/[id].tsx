import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  RefreshControl,
  Pressable,
  Image,
} from "react-native";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ItemListInterface } from "../../types/list";

import * as shoppingListDB from "../../database/shoppingList";
import { useTheme } from "../../context/ThemeContext";
import ItemList from "../../components/shopping/ItemList";
import DefaultHeader from "../../components/defaultHeader";

import Cart from "../../assets/cart.png"

export default function ListDetailPage() {

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    innerContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    headerSummary: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: theme.isDark ? 0.2 : 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      marginBottom: 12,
      borderWidth: theme.isDark ? 1 : 0,
      borderColor: '#333',
    },
    summaryBox: {
      flex: 1,
      alignItems: "center",
    },
    divider: {
      width: 1,
      height: 36,
      backgroundColor: theme.isDark ? "#333" : "#f0f0f0",
      marginHorizontal: 8,
    },
    summaryLabel: {
      fontSize: 13,
      color: theme.colors.text2,
      marginBottom: 4,
      fontWeight: "600",
    },
    summaryNumber: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text,
    },
    content: {
      flex: 1,
    },
    addFloating: {
      backgroundColor: theme.colors.primary,
      height: 52,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 3,
    },
    addFloatingText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
    formContainer: {
      width: "100%",
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: theme.isDark ? 0.2 : 0.03,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      borderWidth: theme.isDark ? 1 : 0,
      borderColor: '#333',
    },
    fieldLabel: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: "500",
      marginBottom: 8,
    },
    input: {
      width: "100%",
      height: 48,
      borderColor: theme.isDark ? "#444" : "#e6e6e6",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 8,
      fontSize: 15,
      backgroundColor: theme.isDark ? "#2a2a2a" : theme.colors.background,
      color: theme.colors.text,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    half: {
      width: "48%",
    },
    inputSmall: {
      height: 44,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
    },
    formButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: theme.isDark ? "#333" : "#f5f5f5",
      marginRight: 10,
    },
    cancelText: {
      color: theme.colors.text,
      fontWeight: "700",
    },
    addButton: {
      backgroundColor: theme.colors.primary,
    },
    addText: {
      color: "#fff",
      fontWeight: "700",
    },
    addTextDisabled: {
      color: "#ffffffcc",
      fontWeight: "700",
    },
    pressed: {
      opacity: 0.85,
    },
    listContainer: {
      flex: 1,
      marginTop: 4,
    },
    emptyWrapper: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 6,
    },
    emptySubtitle: {
      fontSize: 14,
      color: theme.colors.text2,
      marginBottom: 16,
      textAlign: "center",
    },

    cartInlineContainer: {
      alignItems: "center",
      marginTop: 12,
      marginBottom: 20,
    },
    cartInlineButton: {
      width: 64,
      height: 64,
      borderRadius: 16,
      backgroundColor: theme.colors.card,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    cartInlineImage: {
      width: 36,
      height: 36,
    },
    heroImage: {
      width: 220,
      height: 220,
      objectFit: "contain",
      opacity: theme.isDark ? 0.8 : 1,
    },
  });

  const params = useLocalSearchParams();
  const db = useSQLiteContext();
  const navigation = useNavigation();

  const [isFormVisible, setFormVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<ItemListInterface[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const { id, listName } = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <DefaultHeader back title={String(listName)} settings={false} />,
    });
  }, [navigation, listName]);

  async function loadItems() {
    try {
      const listId = parseInt(String(id), 10);
      if (!listId) return;
      const allItems = await shoppingListDB.getItems(db, listId);
      setItems(allItems);
    } catch (error) {
      console.error("Erro: ", error);
      Alert.alert("Erro", "Não foi possível carregar os itens da lista.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [id, db])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  }, [id, db]);

  const handleCancel = () => {
    setItemName("");
    setQuantity("");
    setPrice("");
    setFormVisible(false);
  };

  const sanitizeNumberInput = (text: string) =>
    text.replace(/[^0-9,.\-]/g, "").replace(/,/g, ".");

  const parseQuantity = (text: string) => {
    const sanitized = sanitizeNumberInput(text);
    const parsed = parseFloat(sanitized);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  };

  const parsePrice = (text: string) => {
    const sanitized = sanitizeNumberInput(text);
    const parsed = parseFloat(sanitized);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
  };

  const canAddItem = itemName.trim().length > 0 && !loadingAction;

  const handleAddItem = async () => {
    if (itemName.trim().length === 0) {
      Alert.alert("Erro", "O nome do item é obrigatório.");
      return;
    }

    try {
      setLoadingAction(true);
      const listIdNum = parseInt(String(id), 10);
      if (!listIdNum) {
        Alert.alert("Erro", "Lista inválida.");
        setLoadingAction(false);
        return;
      }
      const qtyNum = parseQuantity(quantity);
      const priceNum = parsePrice(price);

      await shoppingListDB.addListItem(db, listIdNum, itemName.trim(), qtyNum, priceNum);
      await loadItems();
      handleCancel();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      Alert.alert("Erro", "Não foi possível adicionar o item.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleToggleChecked = async (itemId: number, newCheckedState: boolean) => {
    try {
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === itemId ? { ...item, is_checked: newCheckedState } : item
        );

        return updatedItems.sort((a, b) => {
          if (a.is_checked !== b.is_checked) {
            return a.is_checked ? 1 : -1;
          }

          return (a.position || 0) - (b.position || 0);
        });
      });

      await shoppingListDB.updateItemChecked(db, itemId, newCheckedState);

    } catch (error) {
      console.error("Erro ao atualizar item: ", error);
      Alert.alert("Erro", "Não foi possível salvar a alteração.");
      loadItems();
    }
  };

  const totalItemsCount = items.reduce((sum, item) => {
    const quantity = item.quantity;
    return sum + quantity! ;
  }, 0);

  const totalListPrice = items.reduce((sum, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
  }, 0);

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalListPrice);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.innerContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.headerSummary}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Itens</Text>
            <Text style={styles.summaryNumber} accessibilityLabel={`${totalItemsCount} itens`}>
              {totalItemsCount}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryNumber} accessibilityLabel={`Total ${formattedTotal}`}>
              {formattedTotal}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {isFormVisible ? (
            <View style={styles.formContainer}>
              <Text style={styles.fieldLabel}>Novo item</Text>
              <TextInput
                placeholder="Nome do item"
                placeholderTextColor={theme.colors.text3}
                style={styles.input}
                value={itemName}
                onChangeText={(t) => setItemName(t)}
                returnKeyType="next"
                accessible
                accessibilityLabel="Nome do item"
                autoFocus
              />

              <View style={styles.row}>
                <View style={[styles.half]}>
                  <Text style={styles.fieldLabel}>Quantidade</Text>
                  <TextInput
                    placeholder="1"
                    placeholderTextColor={theme.colors.text3}
                    keyboardType="numeric"
                    style={[styles.input, styles.inputSmall]}
                    value={quantity}
                    onChangeText={(t) => setQuantity(t.replace(/[^0-9,.\-]/g, ""))}
                    accessible
                    accessibilityLabel="Quantidade opcional"
                  />
                </View>

                <View style={[styles.half]}>
                  <Text style={styles.fieldLabel}>Preço</Text>
                  <TextInput
                    placeholder="0,00"
                    placeholderTextColor={theme.colors.text3}
                    keyboardType="decimal-pad"
                    style={[styles.input, styles.inputSmall]}
                    value={price}
                    onChangeText={(t) => setPrice(t.replace(/[^0-9,.,]/g, "").replace(/\./g, "").replace(/,/, "."))}
                    accessible
                    accessibilityLabel="Preço opcional"
                  />
                </View>
              </View>

              <View style={styles.buttonRow}>
                <Pressable
                  onPress={handleCancel}
                  style={({ pressed }) => [styles.formButton, styles.cancelButton, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Cancelar adição"
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  onPress={handleAddItem}
                  disabled={!canAddItem}
                  style={({ pressed }) => [
                    styles.formButton,

                    {
                      backgroundColor: canAddItem
                        ? theme.colors.primary
                        : theme.colors.primaryDisabled
                    },

                    pressed && canAddItem && styles.pressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: !canAddItem }}
                  accessibilityLabel="Adicionar item"
                >
                  <Text style={canAddItem ? styles.addText : styles.addTextDisabled}>
                    {loadingAction ? "Adicionando..." : "Adicionar"}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addFloating}
              onPress={() => setFormVisible(true)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Adicionar novo item"
            >
              <Text style={styles.addFloatingText}>+ Adicionar Item</Text>
            </TouchableOpacity>
          )}

          <ScrollView
            style={styles.listContainer}
            contentContainerStyle={items.length === 0 ? styles.emptyWrapper : undefined}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />}
            keyboardShouldPersistTaps="handled"
          >
            {items.length > 0 ? (
              items.map((item) => (
                <ItemList key={item.id} item={item} onToggleChecked={handleToggleChecked} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Sua lista está vazia.</Text>
                <Text style={styles.emptySubtitle}>Toque no botão acima para adicionar um item.</Text>

                <Image source={Cart} style={styles.heroImage}></Image>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}