import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from "@nestjs/common";

import { CreateIdeaDto } from "../ideas/dto/create-idea.dto";
import { AppService } from "../app.service";
import { MethodService } from "./method.service";
import { IsNumber, IsOptional } from "class-validator";
import { QueryParamsDto } from "../global-dto/query-params.dto";
import { Idea } from "../interfaces/idea.interface";

@Controller("method")
export class MethodController {
  ideas: Idea[] = [];

  constructor(private methsrv: MethodService) {
  }

  @Get()
  getIdeas(@Query() queryParams: QueryParamsDto) {
    return this.methsrv.getIdeas();
  }

  @Get("/:id")
  getIdea(@Param("id", ParseIntPipe) id) {
    return this.methsrv.getIdea(id);
  }

  @Post()
  postIdea(@Body() newIdea: CreateIdeaDto) {
    return this.methsrv.postIdeas(newIdea);
  }

  @Delete("/:id")
  deleteIdea(@Param("id", new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) id) {
    return this.methsrv.deleteIdea(id);
  }

  @Put("/:id")
  putIdea(
    @Param("id", ParseIntPipe) id,
    @Body() givenIdea: Partial<Idea>
  ) {
    return this.methsrv.putIdea(id, givenIdea);
  }
}
