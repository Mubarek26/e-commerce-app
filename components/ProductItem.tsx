import Icon from '@/constants/Icons'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'


type Product = {
  images: string[]
    title: string
    price: number
}

type Props = {
  item: Product
  index?: number
}
const width=Dimensions.get('window').width-40;
const ProductItem = ({ item, index }: Props) => {
  const itemIndex = typeof index === 'number' ? index : 0;
  const itemId = (item as any)?.id ?? itemIndex;
  return (
    <Link href={{ pathname: '/product-details/[id]', params: { id: String(itemId) } } as any} asChild>
      <TouchableOpacity >
    <Animated.View entering={FadeInDown.delay(300 + itemIndex * 100)} style={styles.container}>
      <View style={styles.imageWrapper}>
              <Image source={{ uri: item.images[0] }} style={styles.productImg} />
              <TouchableOpacity style={styles.bookmarkbutton} >
                  <Ionicons name="heart-outline" size={24} color="black" />
              </TouchableOpacity>
          </View>
          <View style={styles.productInfo}>
              <Text style={styles.price}>ETB {item.price} </Text>
              <View style={styles.rating}>
                  <Ionicons name="star-outline" size={20} color={'#D4AF37'} />
                  <Text>4.5</Text>
              </View>
          </View>
      <Text style={styles.title}>{item.title}</Text>
        </Animated.View>
      </TouchableOpacity>
      </Link>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginRight: 10,
        width: width / 2,      
  },
   productImg: {
    width: "100%",
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
    
  },
  imageWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 8,
      fontSize: 16,
      color: 'black',
    letterSpacing: 1.1,
  },
    bookmarkbutton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 30,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color: 'black',
    
    },
    productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,


    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginRight: 10,
    }
})


export default ProductItem