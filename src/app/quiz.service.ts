import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('https://opentdb.com/api_category.php');
  }

  
  getQuestions(
    amount: number,
    categoryId: number,
    difficulty: string,
    type: string) {
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (categoryId !== -1) {
      url = `${url}&category=${categoryId}`;
    }
    if (type === 'True/False') {
      url = `${url}&type=boolean`;
    } else if (type === 'Multiple') {
      url = `${url}&type=multiple`;
    }
    if (difficulty !== 'Any') {
      url = `${url}&difficulty=${difficulty.toLowerCase()}`;
    }
    return this.http.get(url);
  }

 

}
