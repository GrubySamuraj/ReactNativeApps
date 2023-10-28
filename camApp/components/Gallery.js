import React from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, ToastAndroid } from 'react-native';
import MyButton from './MyButton';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import PhotoItem from './PhotoItem';

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            numColumns: 5, // ze zmianą na 1 kolumne
            photoHeight: 70,
            photoWidth: 70,
            type: 1,
            toRemove: []
        }
        this.types = ["list", "grid"];
        this.changeLayout = this.changeLayout.bind(this);
        this.cameraOn = this.cameraOn.bind(this);
        this.updatePhotos = this.updatePhotos.bind(this);
        this.goToBig = this.goToBig.bind(this);
        this.addToRemove = this.addToRemove.bind(this);
        this.deletePhotos = this.deletePhotos.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
    }
    async removePhoto(id) {
        this.state.photos.map(async (item) => {
            if (item.id === id) {
                await MediaLibrary.deleteAssetsAsync(item.id);
            }
        });
        const album = await MediaLibrary.getAlbumAsync("DCIM")
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów,
            mediaType: ['photo'],    // typ pobieranych danych, photo jest domyślne
            album: album
        })
        this.setState({
            photos: obj.assets,
            toRemove: []
        });
    }
    goToBig(photo, id) {
        this.props.navigation.navigate("bigPhoto", { photo: photo, removePhoto: this.removePhoto, navigation: this.props.navigation, id: id })
    }
    changeLayout() {
        if (this.state.type === 1) {
            this.setState({
                numColumns: 1,
                photoWidth: 360,
                photoHeight: 300,
                type: 0
            })
        }
        else if (this.state.type === 0) {
            this.setState({
                numColumns: 5,
                photoWidth: 70,
                photoHeight: 70,
                type: 1
            })
        }
    }
    addToRemove(id) {
        for (let x = 0; x < this.state.photos.length; x++) {
            if (this.state.photos[x].id === id && !this.state.toRemove.includes(this.state.photos[x])) {
                let remove = this.state.toRemove;
                this.setState({
                    toRemove: [this.state.photos[x], ...remove]
                });
                console.log(this.state.toRemove);
            }
            else if (this.state.photos[x].id === id && this.state.toRemove.includes(this.state.photos[x])) {
                let remove = this.state.toRemove;
                remove = remove.filter((item) => {
                    return item !== this.state.photos[x]
                })
                this.setState({
                    toRemove: remove
                });
            }
        }
    }
    cameraOn() {
        this.props.navigation.navigate("camera", { updatePhotos: this.updatePhotos });
    }
    updatePhotos(asset) {
        let photos = this.state.photos
        this.setState({
            photos: [asset, ...photos]
        });
    }
    async deletePhotos() {
        this.state.toRemove.map(async (item) => {
            await MediaLibrary.deleteAssetsAsync(item.id);
        });
        const album = await MediaLibrary.getAlbumAsync("DCIM");
        let photos = this.state.photos;
        photos = photos.filter(photo => {
            return !this.state.toRemove.includes(photo)
        })
        this.setState({
            photos: photos,
            toRemove: []
        });
    }
    async componentDidMount() {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        else {
            const album = await MediaLibrary.getAlbumAsync("DCIM")
            let obj = await MediaLibrary.getAssetsAsync({
                first: 100,           // ilość pobranych assetów,
                mediaType: ['photo'],    // typ pobieranych danych, photo jest domyślne
                album: album
            })
            this.setState({
                photos: obj.assets
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar />
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <MyButton value="Layout" fun={this.changeLayout} />
                    <MyButton value="Camera" fun={this.cameraOn} />
                    <MyButton value="Delete" fun={this.deletePhotos} />
                </View>
                <FlatList
                    numColumns={this.state.numColumns}
                    key={this.state.numColumns}
                    data={this.state.photos}
                    renderItem={({ item }) => <PhotoItem
                        uri={item.uri} photo={item} press={this.goToBig}
                        longpress={this.addToRemove} width={this.state.photoWidth}
                        height={this.state.photoHeight} id={item.id}
                    />}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFE0B2"
    },
    text1: {
        fontSize: 60,
        textAlign: "center",
        marginBottom: 20
    },
    text2: {
        fontSize: 30,
        textAlign: "center",
        color: "white"
    }
});
export { Gallery };