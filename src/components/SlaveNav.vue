<template>
    <div>
        <v-list nav dense>
            <v-list-item link :class="{active: isActive}" v-on:click="openWindow()">
                <v-list-item-icon>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{item.num}}</v-list-item-title>

                <v-btn icon v-on:click="closeWindow()">
                    <v-icon >
                        mdi-delete
                    </v-icon>
                </v-btn>
            </v-list-item>

        </v-list>
    </div>
</template>

<script>
    export default {
        name: "SlaveNav",
        computed:{
            isActive(){
                try {
                    if(this.$route.params.id === this.item.id){
                        return true
                    }
                }catch (e) {
                    return false
                }
                return false
            },

        },
        methods:{
            openWindow(){
                this.$router.push(`/about/${this.item.id}`)
            },
            closeWindow(){
                this.$store.dispatch('removeWindowStack',this.item.id)
            }
        },
        props:{
            item: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
    }
</script>

<style scoped lang="scss">

    .active{
        background: #ffcdcd !important;
    }

</style>