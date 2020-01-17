import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Find your Dev'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no github'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7d40e7'
            }
        }
    })
)

export default Routes