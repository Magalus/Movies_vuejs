<template>

    <div>

        <!-- Vue de la page d'accueil du site avec l'affichage des différents films -->

        <div id="navbar">
            <h3 @click="$router.push(`/home`)">Netflix 2.0</h3>
            <div id="menu">
                <button type="button" class="btn btn-light" @click="$router.push(`/form`)">
                    Ajouter un film
                </button>
                <input type="text" v-model="search" placeholder="Rechercher un film...">
            </div>
        </div>

        <div class="row justify-content-center text-center" id="liste_movies">
        
            <div v-for="(movie) in movies_search" @click="$router.push(`/movie/${movie.id}`)">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" v-bind:src="movie.url">
                    <div class="card-body">
                        <p class="card-text">{{ movie.title }}</p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            movie_to_add: {director: {}},
            movie_to_edit: null,
            movies: [],
            search: ""
        }
    },
    mounted() {
        axios.get("movies").then(res => {
            this.movies = res.data;
        })
    },

    methods: {
        newmovie: function() {
            axios.post("movie", this.movie_to_add).then(res => {
                this.movies = res.data;
            })
        },

        edit: function(movie) {
            this.movie_to_edit = movie
        },
        remove: function(index) {
            this.movies.splice(index, 1);
        },
    },

    computed: {
        firstletter: function() {
            return this.message[0]
        },
        movies_search: function() {
            return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
        }
    }
}
</script>

<style>

#navbar
{
    background-color: black;
    color: red;
    display: flex;
    justify-content: space-between;
    height: 80px;
}

#navbar h3
{
    padding-left: 20px;
    line-height: 77px;
}

#navbar h3:hover
{
    cursor: pointer;
}

#menu
{
    display: flex;
    margin: 18px 20px;
}

#menu .btn
{
    margin-right: 10px;
}

#menu input
{
    padding-left: 10px;
}

#liste_movies
{
    background-image: url("../assets/fond.jpg");
    min-height: 100vh;
}

.row 
{
    margin: 0;
}

.card p
{
    font-size: 13px;
    font-weight: bold;
}

.card img
{
    height: 370px;
    border: solid 1px rgb(0, 0, 0, 0.1);
}

.card
{
    margin: 10px;
    transition-property: transform;
    transition-duration: 0.3s;
}

.card:hover
{
    cursor: pointer;
    transform: scale(1.05);
    z-index: 1;
}

</style>