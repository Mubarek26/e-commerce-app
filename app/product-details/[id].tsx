import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ProductType } from '@/types/type';
import ImageSlider from '@/components/imageSlider';
import { Ionicons } from '@expo/vector-icons';
import VariantSelector from '@/components/VariantSelector';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
  isLoading: boolean;
  getProducts: () => void;
  item: any;
  
}
 

const ProductDetails = (props: Props) => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const colorOptions = ['#111', '#c62828', '#1e88e5', '#ff8f00', '#2e7d32', '#6a1b9a', '#ff4081', '#00acc1', '#fbc02d', '#5d4037', '#757575', '#546e7a', '#8d6e63'];
  const sizeOptions = ['S', 'M', 'L', 'XL'];
useEffect(() => {
    getProductDetails();
}, []);
  
  const getProductDetails = async () => {
  // Fetch product details based on the id
  // Try main products first; fall back to saleProducts if not found
  const base = 'http://192.168.137.1:3001';
  const tryUrls = [`${base}/products/${id}`, `${base}/saleProducts/${id}`];

  for (const url of tryUrls) {
    try {
      const response = await axios.get(url);
      setProduct(response.data);
      return;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        // Try next URL
        continue;
      }
      throw error;
    }
  }
}
  
  return (
    <View style={styles.screen}>
      <Stack.Screen options={{
        title: 'Product Details',
        headerTitleAlign: 'center',
      
      }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {product &&
          <Animated.View entering={FadeInDown.delay(500).duration(500)} >
            <ImageSlider images={product.images} />
          </Animated.View>
        }
        {product && (
          <View style={styles.container}>
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>

                <Animated.Text entering={FadeInDown.delay(900).duration(500)} style={styles.title}>{product.title}</Animated.Text>
                <Animated.View entering={FadeInDown.delay(700).duration(500)} style={styles.subRow}>
                  <Ionicons name="star" size={16} color={'#D4AF37'} />
                  <Text style={styles.ratingText}>4.5</Text>
                  <View style={styles.dot} />
                  <Text style={styles.category}>{product.category?.name ?? 'Featured'}</Text>
                </Animated.View>
              </View>
              <Animated.View entering={FadeInDown.delay(900).duration(500)}>  

              <TouchableOpacity>
                <Ionicons name='heart-outline' size={26} color='black' />
              </TouchableOpacity>
              </Animated.View>
            </View>

            <Animated.View entering={FadeInDown.delay(1100).duration(500)} style={styles.priceRow}>
              <Text style={styles.price}>ETB {product.price}</Text>
              <Text style={styles.discount}> 6% off</Text>
              <Text style={styles.badge}>In stock</Text>
            </Animated.View>

            <Animated.Text entering={FadeInDown.delay(1300).duration(500)} style={styles.sectionLabel}>Description</Animated.Text>
            
            < Animated.Text entering={FadeInDown.delay(1500).duration(500)} style={styles.description}>{product.description}</Animated.Text>
            
            < Animated.View entering={FadeInDown.delay(1700).duration(500)}>
              <VariantSelector
              colorOptions={colorOptions}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              sizeOptions={sizeOptions}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
            </Animated.View>
          </View>
        )}
      </ScrollView>

      {product && (
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.actionBar}>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Ionicons name="cart-outline" size={20} color={'#111'} />
            <Text style={styles.secondaryText}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
            <Text style={styles.primaryText}>Buy now</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

export default ProductDetails;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
  },
  category: {
    fontSize: 13,
    color: '#666',
    letterSpacing: 0.2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  discount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#c62828',
    backgroundColor: '#ffe5e5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    letterSpacing: 0.3,
  },
  badge: {
    fontSize: 12,
    color: '#0a7',
    backgroundColor: 'rgba(0,170,119,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: '600',
  },
  sectionLabel: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.2,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e3e3e3',
   
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#f2f2f2',
  },
  primaryButton: {
    backgroundColor: '#111',
  },
  secondaryText: {
    color: '#111',
    fontWeight: '700',
  },
  primaryText: {
    color: 'white',
    fontWeight: '700',
  },

})