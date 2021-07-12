<template>

    <v-col>
        <v-card
        >
            <v-card-title v-if="!edit" class="text-h5">
                {{values}}
            </v-card-title>

            <v-card-title v-if="edit" class="text-h5">
                <input v-model="values">
            </v-card-title>

            <v-card-subtitle>
                {{rename()}}
            </v-card-subtitle>

            <v-card-actions>

                <v-btn icon v-on:click="edit = !edit">
                    <v-icon >
                        {{nameEdit()}}
                    </v-icon>
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-col>

</template>

<script>
    export default {
        name: "RenderProportion",
        methods:{
            rename(){
                let word = this.$store.state.rename[this.item.param] || this.item.param
                return word
            },
            valueRename(){
                let arr = Object.keys(this.param)

                switch(arr[0]) {
                    case 'dadd':
                        return dadd(arr[1])
                    case 'person_phone':
                        return person_phone(String(arr[1]))

                    default:
                        return arr[1]
                }

                function dadd(el) {
                    let data = new Date(el)
                    let day = String(data.getDate()) + '.' + data.getMonth() + '.' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()
                    return day
                }
                function person_phone(el) {
                    let count = 0
                    let number = el.split('').map((i)=>{
                        if (i !== '+' && count === 0 && el.length === 11){count = 2; return '+' + i}

                        if ((i !== '(' || i !== ')') && (count === 2||count === 5)){
                            if (count === 2){count++; return '(' + i}
                            if (count === 5){count++; return ')' + i}
                        }

                        if (i !== '-' && (count === 8||count === 10)){
                            count++; return '-' + i
                        }

                        count++
                        return i

                    }).join('')
                    return number
                }
            },
            nameEdit(){
                return this.edit ? 'mdi-content-save-edit': 'mdi-clipboard-edit'
            },
            value(){
                return this.item.item[this.item.param]
            },
        },
        data(){
            return{
                edit: false,
            }
        },
        computed:{
            values:{
                get() {
                    return this.item.item[this.item.param]
                },
                set(value) {
                    this.$store.state.request.find(i=>i.id === this.item.item.id)[this.item.param] = value
                    if (this.item.param == 'id'){
                        this.$router.push(`/about/${value}`)
                    }
                },
            }
        },
        watch:{
            values(){

            },
        },
        props:{
            item:{
                type: Object,
                default: null,
            }
        }
    }
</script>

<style scoped>

    input{
        border: 1px #cdcdcd dotted;
        width: 100%;
    }

</style>