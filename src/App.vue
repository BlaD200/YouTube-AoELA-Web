<template>
    <div id="app" class="vh-100 text-light">
        <NavBar @searchVideos="searchVideo"></NavBar>

        <div id="bg-custom">
            <b-container fluid="md">
                <router-view></router-view>
            </b-container>
        </div>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar";

    export default {
        name: 'App',
        components: {
            NavBar
        },
        methods: {
            searchVideo(input){
                console.log(input);
                window.location = ({path: "/", query: {videoName: input}})
            }
        }
    }
</script>

<style>
    #app {
        font-family: Roboto, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #181818;
    }

    #bg-custom {
        background-color: #181818;
    }
</style>
