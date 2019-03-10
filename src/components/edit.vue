<template>

    <!-- Vue de la mise à jour d'un film -->

	<div>

        <div id="navbar">
            <h3 @click="$router.push(`/home`)">Netflix 2.0</h3>
            <button type="button" class="btn btn-light accueil" @click="$router.push(`/home`)">
                    Accueil
            </button>
        </div>


	
		<h3 class="text-center titre_film">Editer {{ movie.title }}</h3>

        <div class="row justify-content-center">

            <div class="col-5">
                    
                <div class="form-group">
                    <label for="title">Titre :</label>
                    <input type="text" class="form-control" v-model="movie.title" id="title"/>
                </div>

                <div class="form-group">
                    <label for="year">Date de sortie :</label>
                    <input type="text" class="form-control" v-model="movie.year" id="year"/>
                </div>

                <div class="form-group">
                    <label for="type">Genre :</label>
                    <input v-model="movie.type" class="form-control" id="type">
                </div>

                <div class="form-group">
                    <label for="synopsis">Synopsis :</label>
                    <textarea v-model="movie.synopsis" class="form-control" id="synopsis" rows="8" cols="50"></textarea>
                </div>

                 <div class="form-group">
                    <label for="url_image">URL de l'image :</label>
                    <input v-model="movie.url_image" class="form-control" id="url_image">
                </div>

                 <div class="form-group">
                    <label for="type">Note /5 :</label>
                    <select class="form-control" v-model="movie.note" id="note">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                </div>

                <button class="btn btn-primary" @click='update'>Modifier</button>

            </div>

        </div>

	</div>

</template>

<script>
    
    import axios from 'axios';

    export default {
        data() {
        	return {
            	movie : {director: {}}
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
            update: function() {
                axios.put("/movie", this.movie).then(res => {
                    this.$router.push("/");
                })
            }
        }
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

h3.titre_film
{
    margin: 30px 0px 20px 0px;
}

</style>
