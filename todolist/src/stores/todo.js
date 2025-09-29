import { defineStore } from "pinia";

export const useTodolist = defineStore("task", {
    state: () => {
        const savedTodos = window.localStorage.getItem("todoList");
        const todoList = savedTodos ? JSON.parse(savedTodos) : [];
        const id = todoList.length;
        return {
            todoList,
            id,
        };
    },
    actions: {
        addTodo(task, category) {
            this.todoList.push({
                id: this.id++,
                task: task,
                category: category,
                completed: false,
            });
            window.localStorage.setItem("todoList", JSON.stringify(this.todoList));
        },
        completedTodo(id) {
            const FindId = this.todoList.find((item) => item.id === Number(id));
            FindId ? (FindId.completed = !FindId.completed) : "";
            window.localStorage.setItem("todoList", JSON.stringify(this.todoList));
        },
        editTodo(id,task, category) {
            const findItem = this.todoList.find((item) => item.id === Number(id));
            findItem ? (findItem.task = task) : "";
            findItem ? (findItem.category = category) : "";
            window.localStorage.setItem("todoList", JSON.stringify(this.todoList));
        },
        deleteTodo(id) {
            this.todoList = this.todoList.filter((object) => {
                return object.id !== id;
            });
            window.localStorage.setItem("todoList", JSON.stringify(this.todoList));
        },
    },
});
