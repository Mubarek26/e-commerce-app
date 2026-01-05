import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryType } from '@/types/type';
import { Stack } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
type Props = {};

const ExploreScreen = (props: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const URL = `http://192.168.137.1:3001/categories`;
      const response = await axios.get(URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Explore',
          headerTitleAlign: 'center',
          headerTransparent: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#666" style={{ marginTop: 150 }} />
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInDown.delay(300+index*100)} style={styles.categoryCard}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.categoryImage} 
                  resizeMode="cover"
                />
              </Animated.View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background for the whole screen
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 100, // Space for the transparent header
    paddingBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row', // Align text and image horizontally
    backgroundColor: '#E6E6E6', // Light gray card background from your image
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100, // Fixed height for consistency
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#D1D1D1', // Fallback color while image loads
  },
});