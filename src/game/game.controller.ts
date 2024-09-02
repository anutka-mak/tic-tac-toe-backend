import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { MakeMoveDto } from './dto/make-move.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Post(':id/join')
  join(@Param('id') id: string, @Body() joinGameDto: JoinGameDto) {
    return this.gameService.join(id, joinGameDto);
  }

  @Post(':id/move')
  makeMove(@Param('id') id: string, @Body() makeMoveDto: MakeMoveDto) {
    return this.gameService.makeMove(id, makeMoveDto);
  }

  @Get(':id')
  getGame(@Param('id') id: string) {
    return this.gameService.getGame(id);
  }
}
