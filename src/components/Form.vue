<template>

    <v-container class="point grey lighten-5" v-on:click="addWindow()">
        <v-simple-table>
            <template v-slot:default>

                <thead>
                    <tr class="orange  lighten-3">
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Prop
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(param,i) in renderForm()" :key="i">
                        <td>{{param[0]}}</td>
                        <td><ValueTable :item="param"/></td>
                    </tr>
                </tbody>

            </template>
        </v-simple-table>
    </v-container>


</template>

<script>
    // данные на вывод я мог циклом выводить (если это 'рядовые' данные, то достаточно в json файл их дописать)
    // или руками в html прописать что и где выводить

    // *через 10 мин раздумий* в итоге я выбрал 2й вариант, так как он быстрее
    // *через 30 мин раздумий* в итоге я выбрал 1й вариант.
    import ValueTable from "./ValueTable";
    export default {
        name: "Form",
        components: {ValueTable},
        data(){
            return{
                stopWord: [
                    'id',
                    'initiated_at',
                    'lastUpd',
                    'inn',
                    'meeting_date',
                    'meeting_place',
                    'meeting_state',
                    'is_own',
                    'profile_id',
                    'lastUpd',
                    'inn',
                    'ogrn',
                    'is_own',

                ]
            }
        },
        methods:{
            renderForm(){
                let arr = []
                Object.entries(this.item).forEach(i=>{
                    if(this.stopWord.includes(i[0])){
                        return
                    }
                    let key = this.$store.state.rename[i[0]] || i[0]
                    let value = i[1]

                    arr.push([key, value])
                })
                return arr
            },
            addWindow(){
                if (this.$store.state.view === "invoice") {return}
                this.$store.dispatch('addWindowStack',this.item.id)
                this.$router.push(`/about/${this.item.id}`)
            },
        },

        props:{
            item: {
                type: Object,
                default: null,
            }
        },
    }
</script>

<style scoped lang="scss">

    .point{
        cursor: pointer;
    }

</style>