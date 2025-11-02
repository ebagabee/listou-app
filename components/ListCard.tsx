import { Text, View, StyleSheet, Pressable } from "react-native";
import { MoreVertical, Trash, Copy, Pencil } from "lucide-react-native";
import { useState } from "react";
import theme from "../app/theme";

interface ListCardProps {
  title: string;
  itemsPreview: string;
  onPress: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onRename?: () => void;
}

export default function ListCard({
  title,
  itemsPreview,
  onPress,
  onDelete,
  onDuplicate,
  onRename,
}: ListCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleDeletePress = () => {
    setMenuVisible(false);
    onDelete();
  };

  const handleDuplicatePress = () => {
    setMenuVisible(false);
    onDuplicate?.();
  };

  const handleRenamePress = () => {
    setMenuVisible(false);
    onRename?.();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Pressable style={styles.mainContent} onPress={onPress}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {itemsPreview}
          </Text>
        </Pressable>

        <Pressable style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
          <MoreVertical size={24} color={theme.colors.text} />
        </Pressable>
      </View>

      {menuVisible && (
        <View style={styles.menu}>

          <Pressable style={styles.menuItem} onPress={handleRenamePress}>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuText}>Renomear</Text>
              <Pencil size={18} />
            </View>
          </Pressable>

          <Pressable style={styles.menuItem} onPress={handleDuplicatePress}>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuText}>Duplicar</Text>
              <Copy size={18} />
            </View>
          </Pressable>

          <Pressable style={styles.menuItem} onPress={handleDeletePress}>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuText}>Excluir</Text>
              <Trash size={18} />
            </View>
          </Pressable>

        </View>
      )}
    </View>
  );
}

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
    top: 12,
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 999,
  },
  menuItem: {},
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  menuText: {
    fontSize: 16,
    marginRight: 8,
  },
});