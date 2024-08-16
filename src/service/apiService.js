export const fetchBooks = async () => {
    const response = await fetch('https://kqwpa7r6ec.execute-api.us-east-2.amazonaws.com/Prod/all');
    
    if (!response.ok) {
        throw new Error('Error al obtener los libros');
    }
    
    const data = await response.json();
    return data;
};

