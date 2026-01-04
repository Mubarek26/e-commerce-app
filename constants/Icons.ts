import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';

const Icon = {
    index: ({ color }: { color: string }) => (
        React.createElement(Ionicons, { name: 'home-outline', size: 22, color })
    ),
     explore: ({ color }: { color: string }) => (
        React.createElement(Ionicons, { name: 'search-outline', size: 22, color })
    ),
      notifications: ({ color }: { color: string }) => (
        React.createElement(Ionicons, { name: 'notifications-outline', size: 22, color })
    ),
     cart: ({ color }: { color: string }) => (
        React.createElement(Ionicons, { name: 'cart-outline', size: 22, color })
    ),
     profile: ({ color }: { color: string }) => (
       React.createElement(Image, { source: { uri: 'https://avatar.iran.liara.run/public' }, style: { width: 22, height: 22, borderRadius: 11 } })
    )
};

export default Icon;