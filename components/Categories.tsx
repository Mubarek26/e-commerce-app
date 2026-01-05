import { View,Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

type Props = {
    categories: any[];
    isLoading: boolean;
    getCategories: () => void;
}

const Categories = ({ categories, isLoading, getCategories }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllButton}>See All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Categories
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontWeight: '700',
        letterSpacing: 0.5,
        fontSize: 18,
        color: '#111',
    },
    seeAllButton: {
        color: '#007BFF',
        fontWeight: '600',
        fontSize: 14,
    },
    listContainer: {
        paddingLeft: 2,
        paddingRight: 8,
    },
    categoryItem: {
        width: 80,
        alignItems: 'center',
        marginRight: 12,
    },
    itemImage: {
        height: 64,
        width: 64,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        marginBottom: 6,
    },
    itemName: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
})