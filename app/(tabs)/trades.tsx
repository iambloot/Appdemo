import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TRADES = [
  {
    id: 1,
    status: 'pending',
    offer: {
      title: 'Vintage Camera',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    },
    request: {
      title: 'Leather Jacket',
      image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400&q=80',
    },
    user: 'John Doe',
  },
  {
    id: 2,
    status: 'accepted',
    offer: {
      title: 'Book Collection',
      image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&q=80',
    },
    request: {
      title: 'Guitar',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80',
    },
    user: 'Jane Smith',
  },
];

export default function TradesScreen() {
  return (
    <ScrollView style={styles.container}>
      {TRADES.map((trade) => (
        <View key={trade.id} style={styles.tradeCard}>
          <View style={styles.tradeHeader}>
            <Text style={styles.tradeWith}>Trade with {trade.user}</Text>
            <View
              style={[
                styles.statusBadge,
                trade.status === 'accepted' ? styles.statusAccepted : styles.statusPending,
              ]}>
              <Text
                style={[
                  styles.statusText,
                  trade.status === 'accepted'
                    ? styles.statusTextAccepted
                    : styles.statusTextPending,
                ]}>
                {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.tradeContent}>
            <View style={styles.tradeItem}>
              <Image source={{ uri: trade.offer.image }} style={styles.tradeImage} />
              <Text style={styles.tradeItemTitle}>{trade.offer.title}</Text>
              <Text style={styles.tradeDirection}>You're offering</Text>
            </View>

            <View style={styles.tradeArrow}>
              <MaterialCommunityIcons
                name="swap-horizontal"
                size={24}
                color="#64748B"
              />
            </View>

            <View style={styles.tradeItem}>
              <Image source={{ uri: trade.request.image }} style={styles.tradeImage} />
              <Text style={styles.tradeItemTitle}>{trade.request.title}</Text>
              <Text style={styles.tradeDirection}>You'll receive</Text>
            </View>
          </View>

          <View style={styles.tradeActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.messageButton]}>
              <MaterialCommunityIcons name="message" size={20} color="#2563EB" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            {trade.status === 'pending' && (
              <View style={styles.pendingActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.declineButton]}>
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.acceptButton]}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  tradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tradeWith: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusAccepted: {
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextPending: {
    color: '#D97706',
  },
  statusTextAccepted: {
    color: '#059669',
  },
  tradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tradeItem: {
    flex: 1,
    alignItems: 'center',
  },
  tradeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  tradeItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  tradeDirection: {
    fontSize: 12,
    color: '#64748B',
  },
  tradeArrow: {
    paddingHorizontal: 16,
  },
  tradeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageButton: {
    backgroundColor: '#EFF6FF',
  },
  messageButtonText: {
    color: '#2563EB',
    marginLeft: 8,
    fontWeight: '500',
  },
  pendingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  declineButton: {
    backgroundColor: '#FEE2E2',
  },
  declineButtonText: {
    color: '#DC2626',
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#2563EB',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});