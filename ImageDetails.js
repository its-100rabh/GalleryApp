import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';


const ImageDetails = () => {
    const route = useRoute();

    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.url_s }}
                style={styles.image}
            />
            <Text style={styles.imageTitle}>{item.title}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    imageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default ImageDetails;
