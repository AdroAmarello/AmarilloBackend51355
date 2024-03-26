// Declaramos un array vacío que va a contener los productos que ingrese el usuario
let products = [];

// Se crea la función "addProduct" para añadir productos al array 
const addProduct = (title, description, price, thumbnail, code, stock) => {
	// Creamos un objeto con las propiedades solicitadas
	const newProduct = {
		id: products.length + 1, 
        // a las propiedades se le agrega un Id del producto auto-incrementable utilizando la longitud del array
		title,
		description,
		price,
		thumbnail,
		code,
		stock,
	};

    // Validación de que la codificación de cada producto no se repita, en caso de repetición de código no agrega el producto al array
	const productExists = products.find((product) => product.code === code);
	if (productExists) {
		console.log(
			`El producto ${title} con el código ${code} ya existe`
		);
		return;
	}

    // Validación de que todos los campos sean ingresados correctamente mediante la verificación de que ninguna propiedad obtenga como valor "undefined"
    if(Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios");
        return;
    }

    // Realizadas las validaciones se procede a la carga del producto ingresado por el usuario al array "products"
	products.push(newProduct);
};

// Función que permite ver los productos por consola
const getProducts = () => {
	console.log(products);
	return products;
};

// Función que permite buscar dentro del array un producto a través del Id ingresado por parámetro
const getProductById = (id) => {
    // Se crea objeto con el método find para comprobar si el id existe dentro del array
    const product = products.find( product => product.id === id);
    // Si no encuentra el id entonces no existe el elemento y lo informa por consola
    if (!product) {
        console.log(`No se encontró el producto con el id ${id}`);
        return;
    }

    // En caso de encontrar el id muestra por consola el producto correspondiente
    console.log(product);
    return product;
};

// Test

addProduct("Primer Producto", "El primer producto", 100, "https://www.google.com.ar/", "A1110/01", 30);

addProduct("Segundo Producto", "El segundo producto", 500, "https://www.google.com.ar/", "A1110/02", 20);

addProduct("Tercer Producto", "El tercer producto",	1000, "https://www.google.com.ar/",	"A1110/03", 5);

addProduct("Cuarto Producto", "El cuarto producto", 150, "https://www.google.com.ar/", "A1110/04", 5);


// getProducts();

// getProductById();
