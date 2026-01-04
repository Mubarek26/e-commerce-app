import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import Icon  from '../constants/Icons';
type Props = {
    label: string;
    isFocused: boolean;
    onPress: () => void;
    onLongPress: () => void;
    routeName: keyof typeof Icon;
    href: string;
    testID?: string;
    
}

const TabBarButton = (props: Props) => {
    const { label, isFocused, onPress, onLongPress, href } = props;
  return (
      <Pressable
            testID={props.testID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarBtn}
           
      >
          {props.routeName == 'cart' && (
              <View style={{position: 'absolute', top: 5, right: 20, backgroundColor: Colors.highlight, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, zIndex: 10,}}>
                  <Text>3</Text>
              </View>
          )}
      
          {Icon[props.routeName]({ color: isFocused ? Colors.primary : Colors.black, size: 24 } as any)}
            <Text style={{ color: isFocused ? Colors.primary : Colors.text }}>
              {label}
            </Text>
          </Pressable>
  )
}

export default TabBarButton
const styles = StyleSheet.create({
    tabbarBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    gap: 5,
  },
})