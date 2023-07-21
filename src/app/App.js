import React, { Component } from "react";

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDibMount = this.componentDibMount(this);

    }




    addTask(e){

        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accent' : 'application/json',
                    'Content-Type': 'application/json'
                }   
            })
            .then(res => res.json())
            .then(data => {
                console.log(data),
                M.toast({html: '¡Task Updated!'}),
                this.setState({title: '', description: '', _id: ''})
                this.fetchTasks();
            });
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accent' : 'application/json',
                    'Content-Type': 'application/json'
                }            
            })
            .then(res => res.json())
            .then(res => {
                console.log(res),
                M.toast({html: '¡Task Saved!'}),
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })
            .catch(err => console.log(err));
        }

        e.preventDefault();
    }


    deleteTask(id){

        if(confirm('Are you sure you want to delete it?')){
            
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Deleted'});
                this.fetchTasks()
            });
            console.log(`Deleting task --- ${id}`);
    
        }


    }

    editTask(id){
        console.log(`Editing task --- ${id}`);
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.task)
                this.setState({
                    title:data.task.title,
                    description: data.task.description,
                    _id: data.task._id
                })
            })
    }


    componentDibMount(){
        this.fetchTasks();
    }


    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            console.log(data.tasks)
            this.setState({tasks: data.tasks});
        })
        .catch(err => console.log(err));
    }



    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })

    }

    

    render(){
        return(
            <div>
                {/* NAVIGATION */}
                <h1>Hola Urraca</h1>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">LearningReact</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // console.log(this.state.tasks)
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => {
                                                            this.deleteTask(task._id)
                                                            }}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin: '1%'}} onClick={() => {this.editTask(task._id)}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App