const main = document.getElementById('main');
// console.log(main)
const form =  document.getElementById('form');
const search = document.getElementById('search');

const url_img  = `https://api.themoviedb.org/3`+'/discover/movie?sort_by=popularity.desc&'+'api_key=ab6ef3217e7b0d01c843f808f85fbace';

getMovies(url_img);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        console.log(movie)
        const {title, poster_path, vote_average, overview,release_date,original_language,original_title} = movie;
        const movieEl = document.createElement('nav');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `

        <section>
    
        <img  src="https://image.tmdb.org/t/p/w500${poster_path} " alt="${title}">
        
        
        <span class="title">${vote_average}</span>
        <span  class="len">${original_language}</span>
        <span  class="date">${release_date}</span>

        <div>
            <h1 class="title_film">${original_title}</h1>
            <p>${overview}</p>
        </div>

    </section>

        `
        main.appendChild(movieEl);
    })
}



form.addEventListener('submit', (e) => {
    
    const searchTerm = search.value;
    const mySearch = 'https://api.themoviedb.org/3' + '/search/movie?'+ 'api_key=1cf50e6248dc270629e802686245c2c8' +'&query='+searchTerm
    e.preventDefault();
    if(searchTerm) {
        getMovies(mySearch)
    }else{
        getMovies(url_img);
    }
    search.value = ''
})

