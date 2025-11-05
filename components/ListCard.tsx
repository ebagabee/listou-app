import { Text, View, StyleSheet, Pressable } from "react-native";
import { MoreVertical, Trash, Copy, Pencil, Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface ListCardProps {
  title: string;
  itemsPreview: string;
  onPress: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onRename?: () => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

export default function ListCard({
  title,
  itemsPreview,
  onPress,
  onDelete,
  onDuplicate,
  onRename,
  isMenuOpen,
  onMenuToggle,
}: ListCardProps) {
  const { theme } = useTheme();

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsConfirmingDelete(false);
    }
  }, [isMenuOpen])

  const styles = StyleSheet.create({
    wrapper: {
      position: 'relative',
      width: '100%',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      width: '96%',
      borderWidth: 1,
      borderColor: '#eaeaeaff',
      marginVertical: 8,
      zIndex: 1,
    },
    mainContent: {
      flex: 1,
      marginRight: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.text3,
      fontWeight: '500',
    },
    menuButton: {
      justifyContent: 'center',
      padding: 4,
      zIndex: 2,
    },
    menu: {
      position: 'absolute',
      top: 60,
      right: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      zIndex: 999,
      minWidth: 150,
      overflow: 'hidden'
    },
    menuItemContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    menuText: {
      fontSize: 16,
      marginRight: 8,
      color: theme.colors.text,
    },
    confirmingContainer: {
        backgroundColor: '#dcfce7',
    },
    confirmingText: {
        color: '#15803d',
        fontWeight: 'bold',
    }
  });

  const handleRenamePress = () => {
    onRename?.();
    onMenuToggle();
  };

  const handleDuplicatePress = () => {
    onDuplicate?.();
    onMenuToggle();
  };

  const handleDeletePress = () => {
    if (isConfirmingDelete) {
        onDelete();
        onMenuToggle();
    } else {
        setIsConfirmingDelete(true);
    }
  }

  const handleMainPress = () => {
    if (isMenuOpen) {
      onMenuToggle();
    } else {
      onPress();
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Pressable style={styles.mainContent} onPress={handleMainPress}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {itemsPreview}
          </Text>
        </Pressable>

        <Pressable style={styles.menuButton} onPress={onMenuToggle}>
          <MoreVertical size={24} color={theme.colors.text} />
        </Pressable>
      </View>

      {isMenuOpen && (
        <View style={styles.menu}>
            {/* ITENS FIXOS */}
            <Pressable onPress={handleRenamePress} android_ripple={{color: '#ddd'}}>
                <View style={styles.menuItemContent}>
                    <Text style={styles.menuText}>Renomear</Text>
                    <Pencil size={18} color={theme.colors.text} />
                </View>
            </Pressable>

            <Pressable onPress={handleDuplicatePress} android_ripple={{color: '#ddd'}}>
                <View style={styles.menuItemContent}>
                    <Text style={styles.menuText}>Duplicar</Text>
                    <Copy size={18} color={theme.colors.text} />
                </View>
            </Pressable>

            <Pressable 
                onPress={handleDeletePress} 
                android_ripple={{ color: isConfirmingDelete ? '#bbf7d0' : '#fee2e2' }}
            >
                <View style={[
                    styles.menuItemContent, 
                    isConfirmingDelete && styles.confirmingContainer
                ]}>
                    <Text style={[
                        styles.menuText, 
                        isConfirmingDelete && styles.confirmingText
                    ]}>
                        {isConfirmingDelete ? "Confirmar " : "Excluir "}
                    </Text>
                    
                    {isConfirmingDelete ? (
                        <Check size={18} color="#15803d" />
                    ) : (
                        <Trash size={18} color={theme.colors.text} />
                    )}
                </View>
            </Pressable>
        </View>
      )}
    </View>
  );
}