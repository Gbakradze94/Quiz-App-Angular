import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  
  categories: any = [];
  difficultyList = ['Any', 'Easy', 'Medium', 'Hard'];
  questionQuantity = 5;
  questions = [];
  quizResults: any;
  selectedCategory = '';
  selectedDifficulty = '';
  selectedType = '';
  typeList = ['Any', 'True/False', 'Multiple Choice'];
  view = 'categories';

  private stepIntervalHandler: any;
  private stepTimeoutHandler: any;

   
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.getCategories();
  }

  clearStepHandlers(): void {
    clearTimeout(this.stepTimeoutHandler);
    clearInterval(this.stepIntervalHandler);
  }

  goToDifficulty() {
    this.view = 'difficulty';
  }

  goToQuestionQty() {
    this.view = 'question-quantity';
  }

  goToType() {
    this.view = 'type';
  }

  onBeginQuiz(): void {
    const category = this.categories.filter(
      (item: { name: string }) => item.name === this.selectedCategory
    );
    const categoryId = category[0].id;
    this.quizService
      .getQuestions(
        this.questionQuantity,
        categoryId,
        this.selectedDifficulty,
        this.selectedType
      )
      .subscribe((response: any) => {
        if (response.results.length === 0) {
          this.view = 'no-questions';
        } else {
          this.view = 'questions';
          this.questions = response.results;
        }
      });
  }

  onReturnHome(): void {
    this.questions = [];
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.selectedType = '';
    this.view = 'categories';
  }

  onViewResults(results: any): void {
    results.category = this.selectedCategory;
    this.quizResults = results;
    this.view = 'results';
  }

  setQuestionQuantity(): void {
    this.view = 'difficulty';
  }

  setSelectedCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.view = 'question-quantity';
  }

  setSelectedDifficulty(difficultyLevel: string): void {
    this.selectedDifficulty = difficultyLevel;
    this.view = 'type';
  }

  setSelectedType(type: string): void {
    this.selectedType = type;
    this.view = 'quiz-params';
  }

  stepDownMouseDown(): void {
    if (this.questionQuantity > 1) {
      this.questionQuantity -= 1;
      this.stepTimeoutHandler = setTimeout(() => {
        this.stepIntervalHandler = setInterval(() => {
          if (this.questionQuantity > 1) {
            this.questionQuantity -= 1;
          }
        }, 50);
      }, 500);
    }
  }

  stepUpMouseDown(): void {
    if (this.questionQuantity < 50) {
      this.questionQuantity += 1;
      this.stepTimeoutHandler = setTimeout(() => {
        this.stepIntervalHandler = setInterval(() => {
          if (this.questionQuantity < 50) {
            this.questionQuantity += 1;
          }
        }, 50);
      }, 500);
    }
  }

  
  private getCategories(): void {
    this.quizService.getCategories().subscribe((response: any) => {
      const unsortedCategories = response.trivia_categories;
      unsortedCategories.push({ id: -1, name: 'Random' });
      this.sortAlphabetically(unsortedCategories);
      this.categories = unsortedCategories;
    });
  }

  private sortAlphabetically(array: any): any {
    array.sort((a: any, b: any) => {
      const former = a.name.toUpperCase();
      const latter = b.name.toUpperCase();
      return former < latter ? -1 : former > latter ? 1 : 0;
    });
  }

}
