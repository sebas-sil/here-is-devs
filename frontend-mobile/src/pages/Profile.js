import React from 'react'
import  { View } from 'react-native'
import { WebView } from 'react-native-webview'

function Profile({ navigation }){
    const login = navigation.getParam('github')
    return <WebView style={{flex: 1}} source={{uri: `https://github.com/${login}`}}/>
}

export default Profile