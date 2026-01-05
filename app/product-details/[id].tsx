import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ProductType } from '@/types/type';

type Props = {
  isLoading: boolean;
  getProducts: () => void;
  item: any;
  
}
 

const ProductDetails = (props: Props) => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType | null>(null);
useEffect(() => {
    getProductDetails();
}, []);
  
  const getProductDetails = async () => {
  // Fetch product details based on the id
  // This is a placeholder function. Replace with actual data fetching logic.
  const URI = `http://localhost:3001/saleProducts/${id}`;
    const response = await axios.get(URI);
    console.log(response.data);
    setProduct(response.data);
 
}
  
  return (
    <View>
      <Text>{product?.title}</Text>
    </View>
  )
}

export default ProductDetails;