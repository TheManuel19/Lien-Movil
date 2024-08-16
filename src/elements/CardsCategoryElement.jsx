import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, Image, Dimensions,SafeAreaView } from 'react-native';
import { Card, Button, Overlay, Badge, Divider, Icon } from '@rneui/themed';
import ButtonsElement from './ButtonsElement';
import LoadingElement from './LoadingElement';

const { width } = Dimensions.get('window');
const getRandomImageUrl = () => {
  const urls = [
    'https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1616330682546-2468b2d8dd17?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1464865885825-be7cd16fad8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
};
export default function CardsCategoryElement({ categoria }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOverlayIndex, setVisibleOverlayIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [closeCards, setCloseCards] = useState(false);

  const handlePress = () => {
    setCloseCards(true);
  };

  const toggleOverlay = (index) => {
    setVisibleOverlayIndex(index === visibleOverlayIndex ? null : index);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBooks().then(() => setRefreshing(false));
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`https://kqwpa7r6ec.execute-api.us-east-2.amazonaws.com/Prod/books/search-by-category?category=${categoria}`);
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
  }, [categoria]);

  if (loading) {
    return <LoadingElement/>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView>
      <View>
        {!closeCards ? (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name="arrow-back"
                type="material"
                color="#517fa4"
                onPress={handlePress}
                size={30}
              />
            </View>
            {books.map((book, i) => {
              const isActive = book.status === 0;
              return (
                <View key={i}>
                  <Card style={styles.cards}>
                    <Card.Title>{book.titulo}</Card.Title>
                    <Card.Divider />
                    <Image
                      source={{ uri: getRandomImageUrl() }}
                      style={styles.image}
                      resizeMode='contain'
                    />
                    <Text style={styles.author}>{book.autor}</Text>
                    <Text style={styles.estatus}>{book.editorial}</Text>
                    <Button
                      buttonStyle={styles.button}
                      title='Más info...'
                      onPress={() => toggleOverlay(i)}
                    />
                  </Card>

                  <Overlay
                    isVisible={visibleOverlayIndex === i}
                    onBackdropPress={() => toggleOverlay(i)}
                    overlayStyle={styles.overlay}
                  >
                    <View>
                      <View style={styles.titleContainer}>
                        <Text style={styles.titulos}>{book.titulo}</Text>
                        <Badge
                          value={isActive ? "En stock" : "Ocupado"}
                          status={isActive ? "success" : "error"}
                          containerStyle={styles.badgeContainer}
                        />
                      </View>

                      <Divider />
                      <Image
                        source={{ uri: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                        style={styles.overlayImage}
                        resizeMode='contain'
                      />
                      <Divider />
                      <Text style={styles.textDescription}>{book.descripcion}</Text>
                      <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Button buttonStyle={styles.button} title="Cerrar" onPress={() => toggleOverlay(i)} />
                      </View>
                    </View>
                  </Overlay>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <ButtonsElement />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '90%', // El ancho del overlay será el 90% del ancho de la pantalla
    maxWidth: width * 0.9,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
    maxWidth: '100%', // Ajuste al ancho del dispositivo
  },
  titulos: {
    fontSize: 24,
    flexShrink: 1, // Permite que el texto se encoja si es necesario
    maxWidth: width * 0.7, // Máximo 70% del ancho de la pantalla
  },
  textDescription: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 14,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#0b8b6e',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  overlayImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    marginBottom: 10,
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
  badgeContainer: {
    marginLeft: 10,
  },
});
