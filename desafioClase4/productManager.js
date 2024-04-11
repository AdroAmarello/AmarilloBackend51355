// inicializamos el módulo FileSystem
const fs = require("fs");

// Declaramos un array vacío que va a contener los productos que ingrese el usuario
let products = [];
// Declaramos una variable que va a contener la ruta donde se creará nuestro archivo con la información ingresada
let pathFile = "./data/products.json";


// Se crea la función "addProduct" para añadir productos al array 
// Se declara la función addProduct como asíncrona 
const addProduct = async (title, description, price, thumbnail, code, stock) => {
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

    // Una vez pusheado el producto en el array "products" se escribe en el archivo "products.json" mediante el módulo fs.promises.writeFile y se utiliza el JSON.stringify para que no quede como texto plano

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

// Función que permite obtener los productos del .json
// Se convierte la función "getProduct" en asíncrona
const getProducts = async () => {
	const productsJson = await fs.promises.readFile(pathFile, "utf-8") // Se declara el array "productsJson" con los elementos tomados del archivo "products.json"
    products = JSON.parse(productsJson) || []; // Se le asigna al array "products" el contenido proveniente del "productsJson" y convertido con el "JSON.parse" y en el caso de que no existiese "productJson" se asigna un array vacío
    
    return products;
};

// Función que permite buscar dentro del array un producto a través del Id ingresado por parámetro
// Se convierte la función "getProductById" en asíncrona
const getProductById = async (id) => {
    // Para realizar la búsqueda primero se tienen que obtener los productos del archivo ".json"
    await getProducts();
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

// Función que permite modificación de propiedades de un producto sin alterar el ID

const updateProduct = async (id, dataProduct) => {
    await getProducts(); // se traen los productos del archivo .json

    const index = products.findIndex( product => product.id === id); // se busca el producto cuyo id coincida con el ingresado
    products[index] = {
        ...products[index],
        ...dataProduct
    } // encontrado el producto se le asigna una copia (operador spread) del producto que se encuentra en ese index y si existen las propiedades ingresadas se sobreescriben y si no se crean

    await fs.promises.writeFile(pathFile, JSON.stringify(products)); // se sobreescribe el archivo con las nuevas modificaciones
    console.log(products[index]); // Se muestra por consola el producto modificado
}

// Función que permite eliminar el producto según su ID
const deleteProductById = async (id) => {
    await getProducts();
    products = products.filter( product => product.id !== id); // se asigna al array "products" los elementos que no posean el id ingresado
    await fs.promises.writeFile(pathFile, JSON.stringify(products)); // se sobreescribe el archivo eliminando el producto según el id ingresado

}

// TEST

// CARGA DE PRODUCTOS EN EL .json

// addProduct("Primer Producto", "El primer producto", 100, "https://www.google.com.ar/", "A1110/01", 30);

// addProduct("Segundo Producto", "El segundo producto", 500, "https://www.google.com.ar/", "A1110/02", 20);

// addProduct("Tercer Producto", "El tercer producto",	1000, "https://www.google.com.ar/",	"A1110/03", 5);

// addProduct("Cuarto Producto", "El cuarto producto", 150, "https://www.google.com.ar/", "A1110/04", 5);

// BÚSQUEDA DE PRODUCTO POR ID
// getProductById(4);

// MODIFICACIÓN DE PROPIEDADES DE PRODUCTO
// updateProduct(4, {
//     price: 300,
//     stock: 2, 
// });

// ELIMINACIÓN DE PRODUCTO POR ID
// deleteProductById(1);