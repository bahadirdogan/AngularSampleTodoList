import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Todo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    public todos: Todo[] = [];
    public todoLocale:Todo[] = [];
    public isChecked:boolean = false;
    constructor( private router: Router, private todoService: TodoService ) { }
    
    ngOnInit() {
        this.loadAllTodoList();    
    }
    loadAllTodoList() {
       this.todoLocale = this.todoService.getAllTodoLocale();
        this.todoService.getAllTodos().pipe(take(1)).subscribe(resp => {
            this.todos = resp.body;
        });
    }
    
    onClickEditTodoDetail(id) {
        console.log(id);
        this.router.navigate(['/todo-detail'], {queryParams: {id: id}});
    }
    
    onClickAddTodo() {
        this.router.navigate(['/todo-detail']);
    }
    
    onClickTodoDelete(id) {
        this.todoService.deleteTodoDetail(id);
        this.loadAllTodoList(); 
    }
    
    getOption(index,event) {
        this.todoLocale[index].completed = !event.target.checked;
      }

}
