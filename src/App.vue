<template>
    <v-app id="inspire">

        <Navigation/>


        <v-main class="pl-10">
            <router-view></router-view>
        </v-main>

    </v-app>
</template>

<script>

    import Navigation from "./components/Navigation";
    export default {
        name: 'App',
        data() {
            return {
            }
        },
        components: {
            Navigation

        },
        watch: {
            $route(to) {
                if(to.path.includes('/about/')){
                    this.$store.dispatch('addWindowStack', to.params.id)
                }
            }
        },
        mounted() {
            fetch('https://my-json-server.typicode.com/plushevy/demo/list')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.$store.commit('fillData', {name: 'request',value: data})


                    if(localStorage.getItem('window') !== null){
                        localStorage.getItem('window').split(',').forEach(i=>{
                            this.$store.commit('addWindow',i)
                        })
                    }

                });

            fetch('https://my-json-server.typicode.com/plushevy/demo/meetings')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.$store.commit('fillData', {name: 'invoice',value: data})
                });
        },
    }
</script>


<style lang="scss">
    @import './clear.module.css';

</style>