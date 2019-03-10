<template>
    <div class="class">
        <span class="left">{{leftNum}} items left</span>
        <span class="tabs">
            <span class="tab"
            v-for="state in states"
            :key="state"
            :class='[state,filter === state ? "active":""]'
            @click="toggleFilter(state)"
            >{{state}}</span>
        </span>
        <span class="clear" @click="clearAllCompleted">clear-all-completed</span>
    </div>
</template>

<script>
export default {
    props:{
        filter:{
            type: String,
            required: true
        },
        todos:{
            type: Array,
            required: true,
        }
    },
    data(){
        return{
            states: ['all','completed','active'],
        }
    },
    methods:{
        toggleFilter(state){
            this.$emit('toggleTabs',state); //父组件todo.vue需要根据tabs变化后的状态调整显示的items，故需要将事件以及state向上抛出
        },
        clearAllCompleted(){
            this.$emit('clearAllCompleted');
        },
    },
    computed:{
        leftNum: function () {
            return this.todos.filter(todo => !todo.completed ).length;
        }
    }
}
</script>


<style lang="stylus" scoped>
.tab,.clear{
    cursor pointer
    padding 2px
}
.tab:hover,.clear:hover{
    color red
}
.clear{
    right 2px
}
</style>
