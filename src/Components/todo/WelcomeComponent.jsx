import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component{

    constructor(props){
        super(props)
        this.retrivewelcomeMessage = this.retrivewelcomeMessage.bind(this)
        this.handleSuccessfullResponse = this.handleSuccessfullResponse.bind(this)
        this.handleErrorResponse = this.handleErrorResponse.bind(this)
        this.state = {
            welcomeMessage : ''
        }
    }

    render(){
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click here to get welcome text 
                    <button onClick={this.retrivewelcomeMessage} 
                        className="btn btn-success">Get welcome message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        )
    }

    retrivewelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handleSuccessfullResponse(response))

        // .then(response => this.handleSuccessfullResponse(response))

        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfullResponse(response))
        .catch(error => this.handleErrorResponse(error))
    }

    handleSuccessfullResponse(response){
        console.log(response)
        this.setState({welcomeMessage : response.data.message})
    }

    handleErrorResponse(error){
        // console.log(error.response.data.message)
        let errorMessage = ''
        if(error.message)
            errorMessage += error.message
        
        if(error.response && error.message){
            errorMessage +=  error.response.data.message
        }
        this.setState({welcomeMessage : errorMessage})
    }

}




export default WelcomeComponent