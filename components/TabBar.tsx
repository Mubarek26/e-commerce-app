import { View, Platform, ButtonProps, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const [dimensions, setDimensions] = useState({ width: 100, height: 20 });

  const buttonWidth = dimensions.width / state.routes.length;
  
  useEffect(() => {
    // You can perform any action with buttonWidth here
    tapPosition.value = buttonWidth * state.index + buttonWidth / 2 - (buttonWidth / 4),{ duration: 250};
  },[state.index, buttonWidth]);
  const onTabBarLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  }
  const tapPosition = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tapPosition.value }],
    };
  });
  return (
    <View style={styles.tabBar} onLayout={onTabBarLayout}>
      <Animated.View style={[animatedStyle, { position: 'absolute', top: 0,width:buttonWidth/2, height: 2, backgroundColor: colors.primary }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
           label={String(label)}
          isFocused={isFocused}
          onPress={onPress}
          onLongPress={onLongPress}
            routeName={route.name as any}
             href={buildHref(route.name, route.params) ?? ''}
            
        />  
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 40,
    backgroundColor: '#fff',
  }
});
