import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Cards from './src/elements/Cards';
import CardsCategoryElement from './src/elements/CardsCategoryElement.jsx'


const Drawer = createDrawerNavigator();

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoriaIndex, setCategoriaIndex] = useState(null);

  const toggleCategoria = (index) => {
    setCategoriaIndex(index === categoriaIndex ? null : index);
    console.log(setCategoriaIndex)
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
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error appjs: {error.message}</Text>;
  }

  // Paso 2: Extraer las categorías
  const categories = books.map(book => book.categoria);
  // Paso 3: Eliminar las categorías duplicadas
  const uniqueCategories = [...new Set(categories)];

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerActiveTintColor: '#fff', // Cambia el color del texto del item activo
            drawerInactiveTintColor: '#a5a5a5', // Cambia el color del texto del item inactivo
            drawerActiveBackgroundColor: '#0b8b6e', // Cambia el fondo del item activo
            drawerLabelStyle: {
              fontSize: 16,            // Cambia el tamaño del texto de los ítems
            },
            headerTintColor: '#0b8b6e',
          }}
          initialRouteName="Inicio"
        >
          <Drawer.Screen name="Inicio" component={Cards} />
          {uniqueCategories.map((category, index) => (
            <Drawer.Screen key={index} name={category} component={CardsCategoryElement} initialParams={{ categoria: category }} />
          ))}

        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
