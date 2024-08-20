import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';

export default function LoadingElement() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#9c9da2" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
