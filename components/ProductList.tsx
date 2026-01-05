import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ProductItem from './ProductItem'
type Props = {
    products: any[];
    isLoading: boolean;
    getProducts: () => void;
    item: any;
}

const ProductList = ({ products, isLoading, getProducts, item }: Props) => {
  return (
      <View style={styles.container}>
           <View style={styles.titleWrapper}>
   
             <Text style={styles.title}>For You</Text>
             <TouchableOpacity >
               <Text style={styles.seeAllButton}>See All</Text>
             </TouchableOpacity>
           </View>
         <FlatList
             data={products}
             numColumns={2}
             columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
           keyExtractor={(item) => item.id?.toString()}
           renderItem={({ item, index }) => (
             <ProductItem item={item} index={index} />
           )}
           onRefresh={getProducts}
           refreshing={isLoading}
         />
       </View>
  )
}

export default ProductList
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 10,
    flex: 1,
  },
  title: {
   fontWeight: 'bold',
   letterSpacing: 1,
    
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    
  },
  seeAllButton: {
    color: '#007BFF',
    fontWeight: '600',
  }
  

});