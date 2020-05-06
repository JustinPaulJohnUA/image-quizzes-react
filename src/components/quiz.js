import React from 'react';
import service from '../scripts/services.js';
import { Link } from 'react-router-dom';
import '../styles/quiz.css';

class Quiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions: [], 
            pictures: [],
            choice1: 'a', 
            choice2: 'b', 
            choice3: 'c', 
            score: 0,
            answer: '',
             title:'',
             currentQuestion: 0,
             rightWrong: false
            }
        this.choiceSelected = this.choiceSelected.bind(this)
    }

    componentDidMount(){
        service.getCategoryTitleFromQuiz(this.props.location.state.category_id)
        .then(t => this.setState({title: t.title}))

        service.getAllQuestions(this.props.location.state.id)
        .then(questions => {this.setState({
            questions: questions,
            pictures:questions.map(q=> service.getQuestionImageURL(q.id)),
            choice1: questions[0].choice_1,
            choice2: questions[0].choice_2,
            choice3: questions[0].choice_3,
            answer: questions[0].answer
            });
            return questions;}
        )
        .then(questions => {
            let lenny = questions.length;
            for (let i = 0; i < lenny; i++){
                questions[i].visited = false;
            }
        })   
    }

    componentDidUpdate(prevProps){
        if (this.state.currentQuestion <= 0){
            document.querySelector('.back').disabled = true;
        } else if (this.state.currentQuestion > 0 & this.state.currentQuestion < 5){
            document.querySelector('.back').disabled = false;
        }

    }

    choiceSelected = (event) => {
        let selectedChoice = event.target.value;
        let newScore = this.state.score;
        let nextQuestion = this.state.currentQuestion;
        let newQuestions = this.state.questions.slice();
        let currentQuestion = this.state.currentQuestion;
        let className = `.${event.target.className}`;
    
        if (selectedChoice == 1){
            nextQuestion++;
            this.changeState(this.state.score, nextQuestion, className);
        } else if (selectedChoice == -1){
            nextQuestion--;
            this.changeState(this.state.score, nextQuestion, className);
        } else if (typeof selectedChoice == 'string' & selectedChoice == this.state.answer) {
            if (this.state.questions[currentQuestion].visited == false){
                newScore++;
                newQuestions[currentQuestion].visited = true;
                this.setState({questions: newQuestions})
            }
            nextQuestion++;
            this.displayRightWrong(true, className)
            setTimeout(() => {this.changeState(newScore, nextQuestion, className);}, 2000)
        } else if (typeof selectedChoice == 'string' & selectedChoice != this.state.answer) {
            nextQuestion++;
            this.displayRightWrong(false, className)
            setTimeout(() => {this.changeState(newScore, nextQuestion, className);}, 2000)
        }
    }

    changeState = (newScore, nextQuestion, className) => {
        if (nextQuestion >= 6) {
            this.setState({score: newScore})
            this.displayResults();
        } else {
            let questions = this.state.questions;
            this.setState({
                choice1: questions[nextQuestion].choice_1,
                choice2: questions[nextQuestion].choice_2,
                choice3: questions[nextQuestion].choice_3,
                answer: questions[nextQuestion].answer,
                score: newScore,
                currentQuestion: nextQuestion,
            })
            document.querySelector(className).style.backgroundColor = '#1D3557';
        }

    }

    displayResults = () => {
        document.querySelector('.container').style.display='none';
        document.querySelector('.results').style.display='block';
        document.querySelector('.back').disabled = true;
        document.querySelector('.next').disabled = true;
    }

    displayRightWrong = (rightWrong, className) => {
        if (rightWrong == false){
            document.querySelector(className).style.backgroundColor = 'red';
        } else if (rightWrong == true) {
            document.querySelector(className).style.backgroundColor = 'green';
        }
    }

    render() {
        return (
            <main>
                <div className='cat-header'>
                    <h1>{`Quiz - ${this.state.title}`}</h1>
                </div>

                <div className='results'>
                    <div className='final-score-container'>
                        <p className='results-score-text'>Final Score</p>
                    </div>

                    <div className='results-content'>
    
                        <img className='results-pic' src={this.state.pictures[0]} />

                        <div className='results-content-text'>
                            <p className='results-score'>{this.state.score} / {this.state.questions.length}</p>
                            <p className='flavor'>Quiz Complete!</p>
                        </div>

                    </div>
                </div>

                <div className='container'>
                    <div className='score-container'>
                        <p id='score'>{`Your Score: ${this.state.score} / ${this.state.questions.length}`}</p>
                    </div>

                    <div className='content'>
                        <div className='picture-container'>
                            <img src={this.state.pictures[this.state.currentQuestion]} />
                        </div>

                        <div className="question-choices">
                            <ul>
                                <li>
                                    <button type="button" value={this.state.choice1} onClick={(event) => this.choiceSelected(event)} className='choice1'>{this.state.choice1}</button>
                                </li>
                                <li>
                                    <button type="button" value={this.state.choice2} onClick={(event) => this.choiceSelected(event)} className='choice2'>{this.state.choice2}</button>
                                </li>
                                <li>
                                    <button type="button" value={this.state.choice3} onClick={(event) => this.choiceSelected(event)} className='choice3'>{this.state.choice3}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='skips-container'>
                    <ul>
                        <li><button type='button' value={Number(-1)}  onClick={(event) => this.choiceSelected(event)} className='back'>Back</button></li>
                        <li>
                            {
                                <Link to={{pathname: '/'}} >
                                    <button type='button' className='home'><p>Home</p></button>
                                </Link>
                            }  
                        </li>
                        <li><button type='button' value={Number(1)} onClick={(event) => this.choiceSelected(event)} className='next'>Next</button></li>
                    </ul>
                </div>
            </main>
        )
    }
}

export default Quiz;