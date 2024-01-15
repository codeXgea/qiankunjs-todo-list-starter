import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {Todo} from './entities/todo.entity';
// @ts-ignore
import defaultImg from '../assets/a.jpg'

const defaultSrc = 'https://pic.616pic.com/photoone/00/03/96/618ce5441d6a75161.jpg'

@Injectable()
export class TodoService {

	private todos: Todo[] = [
		{id: 1, description: 'description1', done: false, src: defaultSrc, username: 'username1'},
		{id: 2, description: 'description2', done: false, src: defaultSrc, username: 'username2'},
		{id: 3, description: 'description3', done: true, src: defaultSrc, username: 'username3'},
	];


	create({description, username}: CreateTodoDto): Todo {

		const todo = new Todo();
		todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
		todo.description = description;
		todo.username = username

		this.todos.push(todo);
		return todo;
	}

	findAll(): Todo[] {
		return this.todos;
	}

	findOne(id: number): Todo {
		const todo = this.todos.find(todo => todo.id === id);
		if (!todo) throw new NotFoundException(`TODO with #${id} not found`);

		return todo;
	}

	update(id: number, updateTodoDto: UpdateTodoDto): Todo {

		const {done, description} = updateTodoDto;

		const todo = this.findOne(id);

		if (done !== undefined) todo.done = done;
		if (description) todo.description = description;

		this.todos = this.todos.map(dbTodo => {
			if (dbTodo.id === id) return todo;
			return dbTodo;
		})

		return todo;
	}

	remove(id: number) {

		this.findOne(id);

		this.todos = this.todos.filter(todo => todo.id !== id);
	}
}
