import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { icon: 'view-dashboard', label: 'Dashboard', route: '/' },
  { icon: 'account-group', label: 'Users', route: '/users' },
  { icon: 'chart-bar', label: 'Reports', route: '/reports' },
  { icon: 'cog', label: 'Settings', route: '/settings' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { isDark } = useTheme();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          transform: [
            {
              translateX: isOpen ? 0 : -280,
            },
          ],
        },
      ]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.logo,
            { color: isDark ? '#F8FAFC' : '#1E293B' },
          ]}>
          SwitchKaro
        </Text>
        <TouchableOpacity onPress={onClose}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color={isDark ? '#F8FAFC' : '#1E293B'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <Link key={item.route} href={item.route} asChild>
            <TouchableOpacity
              style={[
                styles.menuItem,
                {
                  backgroundColor:
                    item.route === '/' ? '#EFF6FF' : 'transparent',
                },
              ]}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={item.route === '/' ? '#2563EB' : '#64748B'}
              />
              <Text
                style={[
                  styles.menuText,
                  {
                    color: item.route === '/' ? '#2563EB' : '#64748B',
                  },
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
  },
  menu: {
    padding: 16,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});