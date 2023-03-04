import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Dimensions, ScrollView } from 'react-native';

const banner1 = require('../images/banner1.png')
const banner2 = require('../images/banner2.png')
const banner3 = require('../images/banner3.png')

const { width } = Dimensions.get('window');

import styles from '../../styles';

const images = [
    { uri: banner1 },
    { uri: banner2 },
    { uri: banner3 },
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null)

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         // console.log(scrollViewRef.current.contentOffset.x)
    //         // scrollViewRef.current.scrollTo({
    //         //     x: scrollViewRef.current.contentOffset.x + 300,
    //         //     animated: true
    //         // })
    //     // if (currentIndex < images.length - 1) {
    //     //     setCurrentIndex(currentIndex + 1);
    //     // } else {
    //     //     setCurrentIndex(0);
    //     // }
    //     }, 2000);

    //     return () => clearInterval(intervalId);
    // }, [currentIndex]);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                const { contentOffset } = event.nativeEvent;
                const index = Math.round(contentOffset.x / width);
                setCurrentIndex(index)
                }}
                ref={scrollViewRef}
            >
                {images.map((image, index) => (
                <Image
                    key={index}
                    source={image.uri}
                    style={[styles.image, {width: width - 32}]}
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
    )
}

export default Home
