import axios from 'axios'

class HelloWorldService{
    executeHelloWorldService(){
        // console.log("execute service")
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHelloWorldBeanService(){
        // console.log("execute service")
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    executeHelloWorldPathVariableService(name){
        // console.log("execute service")
        // let username = 'mayur30'
        // let password = 'dummy'

        // let basicAuthHeader = 'Basic ' + window.btoa(username +':'+ password)

        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
        // ,
        //     {
        //         headers : {
        //             authorization : basicAuthHeader
        //         }
        //     }
        )
    }

}

export default new HelloWorldService()