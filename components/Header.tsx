import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
}

export default function Header({ title, onMenuPress }: HeaderProps) {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0F172A' : '#FFFFFF' },
      ]}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <MaterialCommunityIcons
          name="menu"
          size={24}
          color={isDark ? '#F8FAFC' : '#1E293B'}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          { color: isDark ? '#F8FAFC' : '#1E293B' },
        ]}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={isDark ? '#F8FAFC' : '#1E293B'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons
            name="bell"
            size={24}
            color={isDark ? '#F8FAFC' : '#1E293B'}
          />
          <View style={styles.badge} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profile}>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  profile: {
    marginLeft: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});