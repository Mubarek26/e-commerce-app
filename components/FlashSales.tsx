import { View, Text,StyleSheet, TouchableOpacity, ActivityIndicatorBase, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import ProductItem from './ProductItem'

type Props = {
    saleProducts: any[];
    isLoading: boolean;
    getSaleProducts: () => void;

}

const FlashSales = ({saleProducts, isLoading, getSaleProducts}: Props) => {
    const salesEndDate = new Date();
    salesEndDate.setDate(salesEndDate.getDate() + 5); // Flash sale ends in 5 dasys
    salesEndDate.setHours(23,59,59); // Set to end of the day
    const [timeunit, setTimeunit] = React.useState<{
        hours: number;
        minutes: number;
        seconds: number;
        days: number;
    }>({
        hours: 0,
        minutes: 0,
        seconds: 0,
        days: 0,
    });
    useEffect(() => {
        const updateCountDown = () => {
            const currentDate = Date.now();
            const expiryTime = salesEndDate.getTime();
            const timeDifference = Math.max(0, expiryTime - currentDate);
            const seconds = Math.floor(timeDifference / 1000);
            setTimeunit({
                days: Math.floor(seconds / (3600 * 24)),
                hours: Math.floor((seconds % (3600 * 24)) / 3600),
                minutes: Math.floor((seconds % 3600) / 60),
                seconds: Math.floor(seconds % 60),
            });
        };

        updateCountDown();
        const interval = setInterval(updateCountDown, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const formatTimeUnit = (time: number | string) => {
         const t = typeof time === 'number' ? time.toString() : (time ?? '0');
         return t.padStart(2, '0');
     }

    console.log('FlashSales saleProducts length:', saleProducts?.length);
    if (isLoading) {
        return (
        <View>
           <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }
    return (
      <>
      <View style={styles.header}>
          <View style={styles.timerWrapper}>
              <Text style={styles.title}>Flash Sales</Text>
              <View style={styles.timer}>
                  <Ionicons name="time-outline" size={16} color="black" />
                  <Text style={styles.timerText}>{formatTimeUnit(timeunit.days)}: {formatTimeUnit(timeunit.hours)}:{formatTimeUnit(timeunit.minutes)}:{formatTimeUnit(timeunit.seconds)}</Text>
              </View>
          </View>
                   <TouchableOpacity>
                       <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
          
            </View>
            {(!saleProducts || saleProducts.length === 0) ? (
                <View style={styles.emptyWrapper}>
                    <Text style={styles.emptyText}>No flash sale products available.</Text>
                </View>
            ) : (
                <View style={styles.listWrapper}>
                    <FlatList
                        data={saleProducts}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
                        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ marginRight: 15 }}>
                                <ProductItem item={item} />
                            </View>
                        )}
                    />
                </View>
            )}
      </>
      
  )
}

export default FlashSales
const styles = StyleSheet.create({
     header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 8,
        marginHorizontal: 15,
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
    timerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: Colors.highlight,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 12,
    },
    timerText: {
        fontSize: 12,
        fontWeight: '500',
    }
    ,
    listWrapper: {
        height: 320,
    },
    emptyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    emptyText: {
        color: '#666'
    }
})