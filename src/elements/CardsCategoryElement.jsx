import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Card, Button, Overlay } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';

export default function CardsCategoryElement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOverlayIndex, setVisibleOverlayIndex] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const route = useRoute();
  const { categoria } = route.params;

  const toggleOverlay = (index) => {
    setVisibleOverlayIndex(index === visibleOverlayIndex ? null : index);
  };

  const onRefresh = React.useCallback(() => {
    fetchBooks(() => {
      setRefreshing(false);
    }, 2000)
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`https://pcbdpjmpt2.execute-api.us-east-2.amazonaws.com/Prod/books/search-by-category?category=${categoria}`);
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
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {books.map((book, i) => {
          return (
            <View key={i}>
              <Card style={styles.cards}>
                <Card.Title>{book.titulo}</Card.Title>
                <Card.Divider />
                <Text style={styles.author}>{book.autor}</Text>
                <Text style={styles.estatus}>{book.editorial}</Text>
                <Button
                  title='Más info...'
                  onPress={() => toggleOverlay(i)}
                />
              </Card>

              <Overlay
                isVisible={visibleOverlayIndex === i}
                onBackdropPress={() => toggleOverlay(i)}
              >
                <Text>Fecha de publicacion: {book.fecha_publicacion}</Text>
                <Text>{book.status}</Text>
              </Overlay>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cards: {

  },
  author: {
    fontSize: 16,
    marginBottom: 5,
  },
  estatus: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
});
