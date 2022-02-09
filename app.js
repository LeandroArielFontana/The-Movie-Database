let page = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(page < 1000){
        page += 1;
        loadMovies();
    }
})

btnAnterior.addEventListener('click', () => {
    if(page > 1){
        page -= 1;
        loadMovies();
    }
})

//funcion que sirve para la carga de las peliculas
const loadMovies = async() =>{

    try{
        //con la funcion fetch(), nos conectamos a la API, a traves de una URL
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=22b7e00d6f1a133cb571fc1024ecfc2d&page=${page}`);  
        let movies = "";

        //Comprobamos si la respuesta es correcta
        if(response.status === 200){
            const data = await response.json();
            data.results.forEach(movie => {
                movies += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                        <h3 class="titulo">${movie.title}</h1>
                    </div>
                `;
            });;
        }else if (response.status === 401) {
            console.log("Error al buscar la pelicula");
        }else if(response.status === 404) {
            console.log("Error al cargar la pagina");
        }else{
            console.log("Error inesperado");
        }

        //linea de codigo para que aparezca en el contenedor
        document.getElementById('container').innerHTML = movies
        
    }catch(error){
        console.log(error);
    }
    //Siempre que utilicemos async / await, utilizar el try/catch
    
};

loadMovies();

