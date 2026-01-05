import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router';
import { NotificationType } from '@/types/type';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {}

const NotificationsScreen = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const URL = `http://192.168.137.1:3001/notifications`;
      const response = await fetch(URL);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Notifications',
          headerTitleAlign: 'center',
          headerTransparent: true,
        }}
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#333" style={{ marginTop: 150 }} />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(300+index*100)} style={styles.notificationCard}>
              {/* Icon Container */}
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={item.title.toLowerCase().includes('order') ? "cart-outline" : "notifications-outline"} 
                  size={24} 
                  color="#444" 
                />
              </View>

              {/* Text Content */}
              <View style={styles.textContainer}>
                <View style={styles.headerRow}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.timestamp}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
              </View>
            </Animated.View>
          )}
        />
      )}
    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Slightly off-white background
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 110, // Increased to avoid header overlap
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    // Add a light shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  time: {
    fontSize: 11,
    color: '#999',
  },
  message: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
})