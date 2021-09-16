import React , {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component{

    constructor(props){
        console.log('constructor')
        super(props)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.state = {
            message : null,
            todos : [
                // {id : 1 , description : "Learn React" , done : false , targetDate : new Date()},
                // {id : 2 , description : "Visit Japan", done : false , targetDate : new Date()},
                // {id : 3 , description : "Watch Anime", done : false , targetDate : new Date()}
            ]
        }

    }

    componentDidMount(){
        console.log('componentDidMount')
        this.refreshTodos()
    }

    refreshTodos(){
        let username = AuthenticationService.isUserLoggedIn()
        TodoDataService.retriveAllTodos(username)
            .then(
                response => {
                    console.log(response)
                    this.setState({todos : response.data})
                }
            )
    }

    render(){
        console.log('render')
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>IsCompleted?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        // console.log(username + " " + id)
        TodoDataService.deleteTodo(username,id)
        .then(
            response => {
                this.setState({message : `Delete of todo ${id} Successful`})
                this.refreshTodos()
            }
        )
    }

    addTodoClicked(){
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id){
        console.log('update' + id)
        // /todos/${id}
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUserName()
        // // console.log(username + " " + id)
        // TodoDataService.deleteTodo(username,id)
        // .then(
        //     response => {
        //         this.setState({message : `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //     }
        // )
    }
}

export default ListTodosComponent
