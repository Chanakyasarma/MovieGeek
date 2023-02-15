const API_KEY ="api_key=6fee68ae09b63fc6d4c677a02293e180";
const BASE_URL="https://api.themoviedb.org/3";
const API_URL = BASE_URL + '/discover/movie?sort_by=vote_count.desc&sort_by=revenue.desc&primary_release_year=2022&'+API_KEY;
const IMG_URL ='https://image.tmdb.org/t/p/w500';
const K_URL = BASE_URL+'/discover/movie?with_genres=18&primary_release_year=2022&'+API_KEY;
const main=document.getElementById('main');
const form= document.getElementById('form');
const search= document.getElementById('search');
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

getMovie(API_URL);

function getMovie(url){
    fetch(url).then(res=>res.json()).then(data=>{
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML='';
    data.forEach(movie =>{
        const{title, poster_path, vote_average, overview}=movie;
        const movieEl =document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>OverView</h3>
                <a>${overview}</a>
            </div>

             `
             main.appendChild(movieEl);
    

    })
}




function getColor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote >=5){
        return "orange"
    }else{
        return "red"
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getMovie(searchURL+'&query='+searchTerm)
    }
})
