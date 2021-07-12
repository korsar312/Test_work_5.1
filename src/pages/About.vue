<template>

    <v-container>
        <v-row dense v-for="(param,i) in getObjKeys()" :key="i">
            <RenderProportion :item="{param,item}"/>
        </v-row>
    </v-container>



</template>

<script>
    import RenderProportion from "../components/RenderProportion";
    export default {
        name: "About",
        components: {RenderProportion},
        computed:{
            item(){
                return this.$store.state.request.find(i=>i.id === this.$route.params.id)
            }
        },
        data(){
            return{

                url: "https://my-json-server.typicode.com/plushevy/demo/orders/",
            }
        },
        methods:{
            getObjKeys(){
                try {
                    return Object.keys(this.item)
                }catch (e) {
                    console.log(e)
                }
            }
        },
    }
</script>

<style scoped>


</style>