<template>
    <div>
        
        <!-- Vue du formulaire d'ajout d'un film et réalisateur -->

        <div id="navbar">
            <h3 @click="$router.push(`/home`)">Netflix 2.0</h3>
            <button type="button" class="btn btn-light accueil" @click="$router.push(`/home`)">
                    Accueil
            </button>
        </div>

            <h2 class="text-center">Ajouter un film</h2>

            <div class="row justify-content-center">
                
                <div class="col-4">

                    <h5 class="text-center">Film</h5>
                    
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="movie_to_add.title" placeholder="Titre">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" v-model="movie_to_add.year" placeholder="Année">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" v-model="movie_to_add.type" placeholder="Genre">
                    </div>

                    <div class="form-group">
                        <textarea class="form-control" v-model="movie_to_add.synopsis" placeholder="Synopsis" rows="5"></textarea>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" v-model="movie_to_add.url_image" placeholder="url de l'image">
                    </div>

                    <div class="form-group">
                        note /5
                        <select class="form-control" v-model="movie_to_add.note">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                </div>
                  
                <div class="col-4">

                    <h5 class="text-center">Réalisateur</h5>

                    <div class="form-group">
                        <input type="text" class="form-control" v-model="movie_to_add.director.name" placeholder="Nom">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" v-model="movie_to_add.director.birth" placeholder="Naissance">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" v-model="movie_to_add.director.nationality" placeholder="Pays">
                    </div>

                    <button  class="btn btn-primary" v-on:click="newmovie">Ajouter</button> 
                    
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
            movies: [],
            succes: "toto",
        }
    },

    methods: {
        newmovie: function() {
            axios.post("form", this.movie_to_add).then(res => {
                this.movies = res.data;
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

h2
{
    margin: 25px 0px 20px 0px;
}

.row 
{
    margin: 0;
}

</style>