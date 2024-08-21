import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import CardsCategoryElement from './CardsCategoryElement';
import LoadingElement from './LoadingElement';

export default function ButtonsElement() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCards, setShowCards] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handlePress = (category) => {
        setSelectedCategory(category);
        setShowCards(true);
    };

    const fetchBooks = async () => {
        try {
            const response = await fetch('https://kqwpa7r6ec.execute-api.us-east-2.amazonaws.com/Prod/all');
            const data = await response.json();
            setBooks(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) {
        return <LoadingElement />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const categories = books.map(book => book.categoria);
    const uniqueCategories = [...new Set(categories)];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {!showCards ? (
                    uniqueCategories.map((category, index) => (
                        <View style={styles.container} key={index}>
                            <Button
                                title={category}
                                type="solid"
                                onPress={() => handlePress(category)}
                                buttonStyle={styles.button}
                                titleStyle={styles.buttonText}
                                containerStyle={styles.buttonContainer}
                            />
                        </View>
                    ))
                ) : (
                    <CardsCategoryElement categoria={selectedCategory} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: '5%', // Margen horizontal para que se vea bien en pantallas grandes y pequeñas
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '90%', // Ajuste a 90% del ancho del contenedor para más flexibilidad
    },
    button: {
        backgroundColor: '#0b8b6e',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
