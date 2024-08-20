import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native'
import { Button } from '@rneui/themed';
import CardsCategoryElement from './CardsCategoryElement';
import LoadingElement from './LoadingElement';

export default function ButtonsElement() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCards, setShowCards] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada


    const handlePress = (category) => {
        setSelectedCategory(category); // Guarda la categoría seleccionada
        setShowCards(true); // Cambia el estado para mostrar las cards
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
        return <LoadingElement/>
    }

    if (error) {
        return <Text>Error appjs: {error.message}</Text>;
    }

    // Paso 2: Extraer las categorías
    const categories = books.map(book =>   book.categoria);
    // Paso 3: Eliminar las categorías duplicadas
    const uniqueCategories = [...new Set(categories)];
    return (
        <SafeAreaView>
            <View>
                {!showCards ? (uniqueCategories.map((category, index) => (
                    <View style={styles.container}>
                        <Button
                            key={index}
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
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%', // Esto hace que todos los botones tengan el mismo ancho
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
        elevation: 5, // Solo para Android
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
})