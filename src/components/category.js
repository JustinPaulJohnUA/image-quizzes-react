import React from 'react';
import service from '../scripts/services.js';
import { Link } from 'react-router-dom';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {quizzes: []};
    }

    componentDidMount() {
        service.getValidQuizzes(this.props.id)
        .then(quiz => {
            this.setState({quizzes: quiz});
        })


    }


    render() {
        var pictures = [];
        
        this.state.quizzes.forEach( quiz => pictures.push(service.getImageURL(quiz.id, quiz.category_id)))
        return(
            <div>
                { this.state.quizzes.map(quiz => <li>
                                                    {
                                                        
                                                        <Link to={{pathname: '/quiz', state:quiz}}>
                                                            <img src={service.getImageURL(quiz.id, quiz.category_id)}/>
                                                        </Link>
                                                    }
                                                </li>
                                                    )}
            </div>

        )
    }
}

export default Category;