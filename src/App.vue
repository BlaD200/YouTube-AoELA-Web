<template>
    <div id="app" class="vh-100 text-light">
        <NavBar></NavBar>

        <b-container fluid="md">
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar";

    export default {
        name: 'App',
        components: {
            NavBar
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

    .wdth {
        width: 400px;
    }
</style>
