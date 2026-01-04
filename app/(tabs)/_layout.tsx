import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { TabBar } from '@/components/TabBar';
import Icon from '@/constants/Icons';
export default function TabLayout() {
  return (
    <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{headerShown: false}}>
      <Tabs.Screen name='index' options={{
        title: 'Home',
       
      }} />
      <Tabs.Screen name='explore' options={{
        title: 'Explore',
      
      }} />
      <Tabs.Screen name='notifications' options={{
        title: 'Notification',
      
      }} />
      <Tabs.Screen name='cart' options={{
        title: 'Cart',
        tabBarBadge: 4,
      
      }} />
      <Tabs.Screen name='profile' options={{
        title: 'Profile',
      
      }} />
    </Tabs>
  );
}