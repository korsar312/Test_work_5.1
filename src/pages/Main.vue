<template>

    <div>
        <v-container app class="main px-7">
            <Form class="Form" v-for="item in data" :key="item.id" :item="item"/>
        </v-container>

        <v-container class="main">
            <v-btn
                    x-small
                    v-on:click="clearLocalStorage()"
                    elevation="2"
            >Очистить local storage</v-btn>
        </v-container>



    </div>

</template>



<script>

    import Form from "../components/Form";
    export default {
        name: "Main",
        data() {
            return {
            }
        },
        methods:{
            clearLocalStorage(){
                alert(localStorage.getItem('window'))
                localStorage.removeItem('window');
            },
        },
        computed:{
            data(){return this.$store.state[this.$store.state.view]}
        },
        components: {
            Form
        },
    }
</script>



<style scoped lang="scss">

    .main{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

    }
    .Form{
        width: 300px;
        margin: 10px;
    }

</style>
