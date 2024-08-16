import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Cards from './Cards';
import ButtonsElement from './ButtonsElement';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavElement() {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            activeColor="#FFF"
            inactiveColor="#9c9da2"  // Añadido inactiveColor
            barStyle={{ backgroundColor: '#1e3d74' }}
            shifting={true}
            sceneAnimationEnabled={true}
        >
            <Tab.Screen
                name="Feed"
                component={Cards}
                labeled
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

const styles = StyleSheet.create({});
