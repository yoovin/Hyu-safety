import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const banner1 = require('../images/banner1.png')
const banner2 = require('../images/banner2.png')
const banner3 = require('../images/banner3.png')

const { width } = Dimensions.get('window');

const images = [
  { uri: banner1 },
  { uri: banner2 },
  { uri: banner3 },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const { contentOffset } = event.nativeEvent;
          const index = Math.round(contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image.uri}
            style={styles.image}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height: 300,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#333',
  },
});

export default Home
