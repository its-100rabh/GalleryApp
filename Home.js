import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const navigateToImageDetails = (item) => {
        navigation.navigate('Product', { item }); // Navigate to ImageDetails 
    };

    const fetchRecentPhotos = async () => {
        try {
            const response = await fetch(
                'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
            );
            const data = await response.json();
            const recentPhotos = data.photos.photo;
            setPhotos(recentPhotos);

            // Cache the photo URLs
            await AsyncStorage.setItem('cachedPhotos', JSON.stringify(recentPhotos));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const renderPhotoItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToImageDetails(item)}>
            <Image
                source={{ uri: item.url_s }}
                style={{ width: 150, height: 150, margin: 15 }}
            />
        </TouchableOpacity>
    );

    const refreshData = async () => {
        setRefreshing(true);

        try {
            const response = await fetch(
                'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
            );
            const data = await response.json();
            const recentPhotos = data.photos.photo;

            setPhotos(recentPhotos);

            // Cache the latest data
            await AsyncStorage.setItem('cachedPhotos', JSON.stringify(recentPhotos));
        } catch (error) {
            console.error('Error fetching data: ', error);
        }

        setRefreshing(false);
    };

    useEffect(() => {
        // Check if there are cached photos
        AsyncStorage.getItem('cachedPhotos')
            .then((cachedData) => {
                if (cachedData) {
                    setPhotos(JSON.parse(cachedData));
                    setLoading(false);
                } else {
                    fetchRecentPhotos();
                }
            })
            .catch((error) => {
                console.error('Error reading cache: ', error);
                fetchRecentPhotos();
            });
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
                Recent Photos
            </Text>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id}
                renderItem={renderPhotoItem}
                numColumns={2}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshData}
                    />
                }
            />
        </View>
    );
};

export default Home;
