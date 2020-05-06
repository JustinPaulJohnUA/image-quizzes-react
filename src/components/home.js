import React from 'react';
import service from '../scripts/services.js';
import Category from './category.js';
import '../styles/home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {categories: []};
    }

    componentDidMount() {
        service.getAllCategories()
        .then(category => this.setState({categories: category}))
        .catch(e => console.log(e))
    }

    render() {
        return (
            <div>
                <header><h1>Image Quizzes</h1></header>
                <ul>
                    {this.state.categories.map( category => <li>   
                                                                <div className='cat-container'>
                                                                    <h2 className='cat'>{category.title}</h2>
                                                                </div>
                                                                
                                                                <Category id={category.id} />                                                 
                                                            </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Home;