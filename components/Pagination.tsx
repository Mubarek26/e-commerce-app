import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    items: string[];
    paginationIndex?: number;
}

const Pagination = (props: Props) => {
    return (
      <>
    <View style={styles.container }>
      {props.items.map((_, index) => (
          <View key={index} style={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 4, backgroundColor: index === props.paginationIndex ? '#333' : '#ccc' }} />
        ))}
            </View>
            <View style={styles.PaginationNumbercontainer}> 
                <View style={styles.PaginationNumberwrapper}>
                    <Text style={styles.PaginationNumbertext}>{(props.paginationIndex ?? 0) + 1} / {props.items.length}</Text>
                </View>
             </View>
        </>
     
  )
}

export default Pagination
const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    PaginationNumbercontainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'flex-end',
        marginRight: 20,
        width: '100%',
    },
    PaginationNumberwrapper: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    PaginationNumbertext: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
        letterSpacing: 0.5,
    }
})