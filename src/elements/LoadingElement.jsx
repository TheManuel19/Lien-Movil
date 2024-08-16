
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';


export default function LoadingElement() {
    const [loading, setLoading] = useState(true);
    return (
        <SafeAreaView>

            {loading ? (
                <ActivityIndicator size="large" color="#9c9da2" />
            ) : (<Text style={styles.text}>¡Carga completa!</Text>)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});
