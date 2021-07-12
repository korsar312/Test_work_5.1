<template>
    <span v-html="tag"><div></div></span>
</template>

<script>
    export default {
        name: "ValueTable",
        computed:{
            tag(){
                let value = this.valueRename({key:this.item[0],value: this.item[1]})

                if(this.item[0] == 'Статус'){return "<span style='color: red;'>" + value + "</span>"}
                else if(this.item[0] == 'Телефон'){return `<span href="${this.item[1]}">`+ value +"</span>"}
                return "<span>"+ value +"</span>"
            },
        },
        methods:{
            valueRename(payload){
                switch(payload.key) {
                    case 'Дата':
                        return dadd(payload.value)
                    case 'Телефон':
                        return person_phone(String(payload.value))

                    default:
                        return payload.value
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
        },
        props:{
            item: {
                type: Array,
                default(){
                    return []
                },
            }
        },
    }
</script>

<style scoped>

</style>