import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateIdeaDto } from "../ideas/dto/create-idea.dto";
import { Idea } from "../interfaces/idea.interface";

@Injectable()
export class MethodService {
  ideas: Idea[] = [];

  getIdeas(): Idea[] {
    return this.ideas;
  }

  getIdea(id: number) {
    const idea = this.ideas.find((idea) => idea.id === id);
    if (idea)
      return idea;
    throw new NotFoundException(`id ${id} not found`);
  }

  postIdeas(newIdea: CreateIdeaDto): Idea{
    const { name } = newIdea;
    let id: number;
    // if 0 => else
    if (this.ideas.length) {
      id = this.ideas[this.ideas.length - 1].id + 1;
    } else {
      id = 1;
    }

    const idea: Idea = {
      id: id,
      name: name,
      createdAt: new Date()
    }
    this.ideas.push(idea);
    return idea;
  }

  deleteIdea(id: number): string{
    const index = this.ideas.findIndex((idea) => idea.id === id);
    if (index >= 0) {
      this.ideas.splice(index, 1);
    } else {
      throw new NotFoundException(`id ${id} not found`);
    }

    return `idea with id ${id} deleted`;
  }

  putIdea(id: number, givenIdea: Partial<Idea>): Idea {
    //if throw not found then not going further
    const todo = this.getIdea(id);
    todo.name = givenIdea.name ? givenIdea.name : todo.name;
    return todo;
  }
}
