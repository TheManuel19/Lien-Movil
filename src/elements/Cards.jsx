import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, Image, Dimensions, SafeAreaView } from 'react-native';
import { Card, Button, Overlay, Badge, Divider } from '@rneui/themed';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8; // 80% del ancho de la pantalla
const cardHeight = 300; // Altura fija para las tarjetas

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

export default function Cards() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOverlayIndex, setVisibleOverlayIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const toggleOverlay = (index) => {
    setVisibleOverlayIndex(index === visibleOverlayIndex ? null : index);
  };

  const onRefresh = React.useCallback(() => {
    fetchBooks(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {books.map((book, i) => {
            const isActive = book.status === 0;
            return (
              <View key={i} style={styles.cardContainer}>
                <Card containerStyle={styles.card}>
                  <Card.Title>{book.titulo}</Card.Title>
                  <Image
                    source={{ uri: getRandomImageUrl() }}
                    style={styles.image}
                    resizeMode='contain'
                  />
                  <Card.Divider />
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
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', }}>
                      <Button buttonStyle={styles.button} title="Cerrar" onPress={() => toggleOverlay(i)} />
                    </View>
                  </View>
                </Overlay>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection:'row',
  },
  cardContainer: {
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra
    shadowOpacity: 0.6, // Opacidad de la sombra
    shadowRadius: 5, // Radio de la sombra
    width: cardWidth,
    height: cardHeight,
    marginRight: 10,
  },
  card: {
    width: '90%',
    height: '90%',
    justifyContent: 'space-between', // Asegura que los elementos estén espaciados correctamente dentro de la tarjeta
  },
  image: {
    width: '100%',
    height: 100, // Ajusta la altura de la imagen para que se mantenga consistente
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
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
    maxWidth: '100%',
  },
  titulos: {
    fontSize: 24,
    flexShrink: 1,
    maxWidth: width * 0.7,
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
  overlayImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  badgeContainer: {
    marginLeft: 10,
  },
  overlay: {
    width: '90%',
    maxWidth: width * 0.9,
  },
});
