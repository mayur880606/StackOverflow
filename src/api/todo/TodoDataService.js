import axios from 'axios'

class TodoDataService{
    retriveAllTodos(name){
        // console.log("execute service")
        return axios.get(`http://localhost:8080/users/${name}/todos`)
    }

    retriveTodo(name,id){
        // console.log("execute service")
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    deleteTodo(name,id){
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    updateTodo(name,id,todo){
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
    }

    createTodo(name,todo){
        return axios.post(`http://localhost:8080/users/${name}/todos/`, todo)
    }
}

export default new TodoDataService()