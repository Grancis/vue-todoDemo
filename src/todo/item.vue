<template>
    <div id="item" :class="['todo-item',todo.completed ? 'completed' : '']">
        <input 
        type="checkbox"
        class="toggle"
        v-model="todo.completed"
        >
        <label>{{todo.content}}</label>
        <button class="delete-btn" @click="deleteTodo">×</button>
    </div>
</template>

<script>
export default {
    props:{
        todo:{
            type: Object,
            required: true
        }
    },
    methods: {
        deleteTodo(){
            this.$emit('deleteItem',this.todo.ids)
        },
    }
}
</script>

<style lang="stylus" scoped>
.toggle{
    }
</style>

