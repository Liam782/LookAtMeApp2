import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import {StatusBar} from 'expo-status-bar';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
        }

        this.onFacesDetected = this.onFacesDetected.bind(this)
    }

    async componentDidMount() {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasCameraPermission: status === "granted"})
    }

    onFacesDetected({ faces }) {
        this.setState({ faces: faces })
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }

        return(
            <View style = {styles.container}>
                <View style={styles.titleContainer}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.title}>Look At Me!</Text>
                    </View>
                </View>

                <View style = {styles.cameraContainer}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />

                    {this.state.faces.map(face => (
                        <Filter1 key = {`face-id-&{face.faceID}`} face = {face}/>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    titleContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#6278e4"
    },

    title: {
        fontSize: RFValue(30),
        fontWeight: "bold",
        color: "#efb141",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },

    cameraContainer: {
        flex: 0.5
    },

    actionPanel: {
        flex: 0.2,
        paddingLeft: RFValue(20),
        paddingRight: RFValue(20),
        paddingTop: RFValue(30),
        backgroundColor: "#6278e4"
    },
})