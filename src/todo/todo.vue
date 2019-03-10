<template>
    <div class="real-app">
        <input 
        type="text"
        class="input-class"
        @keyup.enter="addTodo"
        placeholder="Something To Do"
        autofocus="autofocus"
        >
        <item 
        :todo="todo"
        v-for="todo in filtedTodos"
        :key="todo.id"
        @deleteItem="deleteItem"></item>
        <tabs :filter="filter" 
        :todos="todos"
        @toggleTabs="toggleItemsReveal"
        @clearAllCompleted="clearAllCompleted"></tabs>
    </div>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0;
export default {
    data(){
        return{
            todos:[], //可以传入多个todo数据，应当为一个数组
            filter: 'all',
        }
    },
    components:{
        Item,
        Tabs,
    },
    computed:{
        filtedTodos: function () {
            if (this.filter == 'all'){return this.todos}
            let completed = this.filter === 'completed';
            return this.todos.filter(todo => todo.completed == completed);
        },
        
    }
    ,
    methods:{
        addTodo(e){
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false,
            });
            e.target.value="";
        },
        deleteItem(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === id),1); //findIndex 接受一个函数，调用findIndex的数组将其数组元素依次传入函数中，函数返回`true`时拿到index
        },
        toggleItemsReveal(state){
            this.filter = state ;
        },
        clearAllCompleted: function (){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    }
}
</script>

<style lang="stylus" scoped>
.real-app{
    width 60%
    margin 0 auto 
    background rgba(255,255,255,0.5)
    }
.input-class{
    width 100%
    height 40px
    font-size 30px
    }
</style>
