import { Component, EventEmitter, 
        Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() category: string;
  @Input() questions = [];
  @Output() viewResults = new EventEmitter();
  answers = [];
  answerSubmitted = false;
  correctAnswer = '';
  currentQuestion = '';
  currentQuestionIndex = 0;
  difficulty: string;
  disableAnswers = false;
  incorrectAnswer = '';
  viewResultsEnabled = false;
  scoreDisplay = 0;
  
  


 public quizResults = {
    correct: 0,
    incorrect: 0,
    scoreDisplay: 0
  };

  private selectedAnswer = '';
  private score: any;

  constructor() { }

  ngOnInit() {
    if (this.questions.length > 0) {
      this.difficulty = this.questions[0].difficulty;
      this.currentQuestion = this.questions[0].question;
      this.answers = this.getAnswers(this.questions[0]);
      
    }
  }


  onAnswerClick($event: any): void {
    this.disableAnswers = true;
    this.selectedAnswer = $event.srcElement.innerText;
    this.correctAnswer = this.questions[this.currentQuestionIndex].correct_answer;

    if (
      this.questions[this.currentQuestionIndex].correct_answer !==
      this.selectedAnswer
    ) {
      this.incorrectAnswer = this.selectedAnswer;
      this.quizResults.incorrect += 1;
      this.scoreDisplay += 0;
    } else {
      this.quizResults.correct += 1;
      this.scoreDisplay += 100 / this.questions.length;
    }
    if (this.questions.length - 1 !== this.currentQuestionIndex) {
      this.answerSubmitted = true;
    } else {
      this.viewResultsEnabled = true;
    }
  }

  onNextBtnClick(): void {
    this.disableAnswers = false;
    this.currentQuestionIndex += 1;
    this.difficulty = this.questions[this.currentQuestionIndex].difficulty;
    this.currentQuestion = this.questions[this.currentQuestionIndex].question;
    this.answers =
      this.getAnswers(this.questions[this.currentQuestionIndex])
      ;
    this.selectedAnswer = '';
    this.correctAnswer = '';
    this.incorrectAnswer = '';
    this.answerSubmitted = false;
    this.scoreDisplay;
  }

  onViewResults(): void {
    this.viewResults.emit(this.quizResults);
  }


  private getAnswers(question: any): any {
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    return answers;
  }


}
