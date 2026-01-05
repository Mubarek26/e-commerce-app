import { View, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Animated, StyleSheet } from 'react-native'
import React from 'react'
import Pagination from './Pagination';
type Props = {
    images: string[];

}
const width = Dimensions.get('window').width;
const cardWidth = width - 40;
const ImageSlider = ({ images }: Props) => {
  const [paginationIndex, setPaginationIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setPaginationIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View style={styles.sliderContainer}>
          <Animated.FlatList
              data={images}
              horizontal
              pagingEnabled
              snapToInterval={width}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={handleMomentumEnd}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ];

                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.92, 1, 0.92],
                  extrapolate: 'clamp',
                });

                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [12, 0, 12],
                  extrapolate: 'clamp',
                });

                return (
                  <Animated.View
                    style={[
                      styles.card,
                      {
                        transform: [{ scale }, { translateY }],
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: item }}
                      style={styles.image}
                    />
                  </Animated.View>
                );
              }}
          />
          <Pagination items={images} paginationIndex={paginationIndex} />
    </View>
  )
}

export default ImageSlider

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: cardWidth,
    height: 300,
    borderRadius: 18,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
});