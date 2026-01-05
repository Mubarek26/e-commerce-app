import { StyleSheet, Image, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios';
import { Stack } from 'expo-router';
import Header from '../../components/Header';
import ProductItem from '../../components/ProductItem';
import ProductList from '../../components/ProductList';
import Categories from '@/components/Categories';
import FlashSales from '@/components/FlashSales';
type Props = {
  products: any[];
  isLoading: boolean;
  getProducts: () => void;
  item: any;
}

const HomeScreen = (props: Props) => {

  const [products, setProducts] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [saleProducts, setSaleProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    getProducts();
    getCategories();
    getSaleProducts();
  }, []);

  const getProducts = async () => {
    const URL = `http://192.168.137.1:3001/products`;
    const response = await axios.get(URL);
    console.log(response.data);
    setProducts(response.data);
    setIsLoading(false);
  }
   const getCategories = async () => {
    const URL = `http://192.168.137.1:3001/categories`;
    const response = await axios.get(URL);
    console.log(response.data);
    setCategories(response.data);
    setIsLoading(false);
  }

   const getSaleProducts = async () => {
    const URL = `http://192.168.137.1:3001/saleProducts`;
    const response = await axios.get(URL);
    console.log(response.data);
    setSaleProducts(response.data);
    setIsLoading(false);
   }
  if (isLoading) {
    return (
      <View>
         <ActivityIndicator size="large" color={'#0000ff'} />
          </View>
    )
  }
  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        header: () => <Header />
      }} />
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item, index }) => (
          <ProductItem item={item} index={index} />
        )}
        ListHeaderComponent={() => (
          <>
            <Categories categories={categories} isLoading={isLoading} getCategories={getCategories} />
            <FlashSales saleProducts={saleProducts} isLoading={isLoading} getSaleProducts={getSaleProducts} />
            <View style={{ marginTop: 10,marginHorizontal: 15, marginBottom: 15 }}>
              <Image source={require('@/assets/images/sale-banner.jpg') } style={{ width: '100%', height: 150, borderRadius: 15 }} />
              </View>
            <View style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', letterSpacing: 1 }}>For You</Text>
                <TouchableOpacity>
                  <Text style={{ color: '#007BFF', fontWeight: '600' }}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        onRefresh={getProducts}
        refreshing={isLoading}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
        </>
  )
}

export default HomeScreen

