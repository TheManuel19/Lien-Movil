import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Cards from './Cards';
import ButtonsElement from './ButtonsElement';
import BackELement from './BackELement';

const Tab = createMaterialBottomTabNavigator();
const { width, height } = Dimensions.get('window');

export default function TabNavElement() {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            activeColor="#FFF"
            inactiveColor="#9c9da2"
            barStyle={styles.barStyle}
            shifting={true}
            sceneAnimationEnabled={true}
        >
            <Tab.Screen
                name="Feed"
                component={BackELement}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: "#061b87",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Categorias"
                component={ButtonsElement}
                options={{
                    tabBarLabel: 'Categorias',
                    tabBarColor: "#061b87",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: '#1e3d74',
        height: height * 0.1, // Ajusta la altura de la barra según la altura de la pantalla
    },
});
