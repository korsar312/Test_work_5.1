<template>
    <v-navigation-drawer permanent :mini-variant="navOpen" fixed touchless class=".overflow-hidden">

        <v-list nav dense>
            <v-btn icon v-on:click="navOpen = !navOpen">
                <v-icon >
                    {{slide}}
                </v-icon>
            </v-btn>

            <v-list-item link v-on:click="changeView('request')">
                <v-list-item-icon>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Заявки</v-list-item-title>
            </v-list-item>

            <v-list-item link v-on:click="changeView('invoice')">
                <v-list-item-icon>
                    <v-icon>mdi-folder</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Счёт</v-list-item-title>
            </v-list-item>

        </v-list>

        <v-divider></v-divider> <!--    ======================     -->

            <SlaveNav v-for="(item, i) in $store.state.window" :key="i" :item="item"/>

        <v-divider></v-divider> <!--    ======================     -->

        <v-list-item v-on:click="addNewReq()">
            <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Добавить</v-list-item-title>
        </v-list-item>

    </v-navigation-drawer>

</template>


<script>
    import SlaveNav from "./SlaveNav";
    export default {
        name: "Navigation",
        data(){
            return{
                navOpen: true,
            }
        },
        components: {SlaveNav},
        computed:{
            slide(){
                return this.navOpen ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'
            }
        },
        methods:{
            changeView(el){
                this.$route.path !== '/' && this.$router.push('/')
                this.$store.commit('changeView',el)
            },
            addNewReq(){
                this.$store.dispatch('createWindowStack')
            },
        },
    }
</script>


<style scoped lang="scss" >


</style>