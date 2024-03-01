import React, { useState } from 'react';
import {StyleSheet, View, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import {Image} from "expo-image";

const IMAGES = [
    'https://placekitten.com/200/200',
    'https://placekitten.com/300/300',
    'https://placekitten.com/400/400',
    'https://placekitten.com/500/500',
    'https://placekitten.com/600/600',
];

const numColumns = 3;
const WIDTH = Dimensions.get('window').width;

const App = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.imageWrapper} onPress={() => {
            setSelectedImage(item)
        }}>
            <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={IMAGES}
                renderItem={renderItem}
                keyExtractor={item => item}
                numColumns={numColumns}
            />
            <Modal visible={!!selectedImage} transparent={true} onRequestClose={() => setSelectedImage(null)}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
                        {selectedImage ? <Image source={{uri: selectedImage.toString(), width: 200, height: 200}} style={styles.zoomedImage}/> : null}
                    </TouchableOpacity>
                </View>
            </Modal>
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
    imageWrapper: {
        width: WIDTH / numColumns,
        height: WIDTH / numColumns,
        padding: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    zoomedImage: {
        width: '50%',
        height: '50%',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        padding: 10,
    }
});
export default App;
