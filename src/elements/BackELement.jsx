import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Cards from './Cards';

const BackElement = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <LinearGradient
                    colors={['transparent', '#9aa388', 'white']}
                    style={styles.gradient}
                />
                <View style={styles.containerImage}>
                    <Image
                        source={require('../../assets/lien.jpg')} 
                        style={styles.image}
                    />
                    <Text style={styles.title}>LIEN</Text>
                </View>
                <View style={styles.cardContainer}>
                    <Cards />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent', // Hace el SafeAreaView transparente
    },
    container: {
        flex: 1,
    },
    containerImage: {
        alignItems: 'center',
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra
        shadowOpacity: 0.6, // Opacidad de la sombra
        shadowRadius: 10, // Radio de la sombra
    },
    image:{
        borderRadius: 10, // Hace las esquinas más redondeadas
        marginBottom: 5,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Mueve el View hacia abajo
        alignItems: 'center',
        marginBottom: 10, // Ajusta este valor según sea necesario
    },
    title: {
        fontSize: 18,
        color:'#fff',
        fontWeight: 'bold',
    },
});

export default BackElement;
