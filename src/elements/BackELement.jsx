import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Cards from './Cards'; // Asegúrate de importar el componente correcto

const { width, height } = Dimensions.get('window');

export default function BackElement() {
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
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
    },
    containerImage: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    image: {
        width: '50%', // Ajusta el ancho al 100% del contenedor
        height: undefined, // Permite que la altura sea calculada automáticamente para mantener la relación de aspecto
        aspectRatio: 1, // Establece la relación de aspecto correcta para la imagen
        borderRadius: 10,
        marginBottom: 5,
        resizeMode: 'contain', // Ajusta la imagen para que quepa completamente sin cortar
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'flex-start',
        alignItems: 'center',
        marginBottom: height * 0.05, // Proporcional al tamaño de la pantalla
        
    },
    title: {
        fontSize: width * 0.05, // Proporcional al ancho de la pantalla
        color: '#fff',
        fontWeight: 'bold',
    },
});

