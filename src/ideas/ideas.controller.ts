import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { IdeasService } from "./ideas.service";
import { CreateIdeaDto } from "./dto/create-idea.dto";
import { Idea } from "./schemas/idea.schema";

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  async create(@Body() createCatDto: CreateIdeaDto) {
    await this.ideasService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Idea[]> {
    return this.ideasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Idea> {
    return this.ideasService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ideasService.delete(id);
  }
}
