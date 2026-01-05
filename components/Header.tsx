import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

type Props = {}

const Header = (props: Props) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 20, color: Colors.primary }}>SX</Text>
          <Link href={"/explore"} asChild>
              <TouchableOpacity style={styles.searchButton}>
              <Text style={{ marginRight: 5 }}>Search</Text>
              <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
          </Link>
    </View>
  )
}


export default Header
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomColor: '#e5e5e5',
        backgroundColor: 'white',
        
    },
    searchButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginLeft: 10,
        marginBottom: 10,
    }
})