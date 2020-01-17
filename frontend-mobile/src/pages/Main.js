import React, { useEffect, useState } from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'

function Main({ navigation }){

    const [currentLocation, setCurrentLocation] = useState(null)
    const [devsList, setDevsList] = useState([])
    const [techs, setTechs] = useState('')

    // console.log('currentLocation: ' + currentLocation)
    // if(!currentLocation){
    //     // nao mostre a tela enquanto nao existir a localização
    //     return null;
    // }

    async function loadDevs(){

        const { latitude:lat, longitude:lng } = currentLocation

        if(currentLocation){
            const response = await api.get('/search', {
                params: {
                    lat, 
                    lng,
                    tech: techs
                }
            })

            setDevsList(response.data)
        }
    }

    function handleRegionChanged(region){
        console.log(region)
        setCurrentLocation(region)
    }

    useEffect(()=>{
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync()

            if(granted){
                const {coords:{latitude:lat, longitude:lng}} = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                setCurrentLocation({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    },[])

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentLocation} style={styles.map}>
                {devsList.map(dev => (
                    <Marker key={dev._id} coordinate={{
                        longitude: dev.location.coordinates[0],
                        latitude: dev.location.coordinates[1]
                    }} >
                    <Image style={styles.avatar} source={{uri: dev.avatar_url}}/>

                    <Callout onPress={() => {
                        //navegacao
                        navigation.navigate('Profile', { github: dev.github })
                        }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devThecs}>{dev.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput onChangeText={setTechs} style={styles.searchInput} placeholder='Buscar devs por tecnologia...' placeholderTextColor='#999' autoCapitalize='words' autoCorrect={false} />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name='my-location' size={20} color='#fff'/>
                </TouchableOpacity>
            </View>
        </>
        )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devThecs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#3333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main