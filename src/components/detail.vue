<template>
    <div>

        <!-- Vue du détail d'un film -->

        <div id="navbar">
            <h3 @click="$router.push(`/home`)">Netflix 2.0</h3>
            <button type="button" class="btn btn-light accueil" @click="$router.push(`/home`)">
                    Accueil
            </button>
        </div>

        <div class="row justify-content-center detail_movie">

            <div class="col-3">
                <img class="card-img-top" v-bind:src="movie.url_image">
            </div>
            
            <div class="col-6">

                <h3>{{ movie.title }} ({{movie.year}})</h3>
                <p>Réalisateur : {{movie.director.name}} ({{movie.director.nationality}}) né.e en {{movie.director.birth}}</p>
                <p>Genre : {{movie.type}}</p>
                <p> Synopsis : {{ movie.synopsis }} </p>
                <p> Note : {{ movie.note }} / 5 </p>
                <button class="btn btn-primary" @click='$router.push({path: `/movie/${movie.id}/edit` })'>Editer</button>
                <button class="btn btn-primary" @click='delete_movie'>Supprimer</button>

            </div>
        
        </div>

    </div>
</template>

<script>

    import axios from 'axios';

    export default {
        data() {
            return {
                movie: { director: {}}
            }
        },
        mounted() {
            axios.get(`movie/${this.$route.params.id}`).then(res => {
                this.movie = res.data;
            }).catch(err => {
                if (err.response.status === 404)
                    this.$router.push("/");
            })
        },
        methods: {
            delete_movie: function() {
                axios.delete(`movie/${this.$route.params.id}`).then(res => {
                    this.$router.push("/");
                })
            },
        },

    }
</script>

<style>

#navbar
{
    background-color: #2C2C2C;
    color: red;
    display: flex;
    justify-content: space-between;
    height: 80px;
}

#navbar h3:hover
{
    cursor: pointer;
}

#navbar h3
{
    padding-left: 20px;
    line-height: 77px;
}

#navbar .accueil
{
    margin: 18px 25px;
}

.row 
{
    margin: 0;
}

.detail_movie
{
    margin-top: 35px!important;
}

.detail_movie p
{
    text-align: justify;
}

.detail_movie h3
{
    margin-bottom: 20px;
}

.detail_movie img 
{
    height: 450px;
}

</style>