import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { JoinGameDto } from './dto/join-game.dto';

@Injectable()
export class GameService {
  private game: Game;

  constructor() {
    this.game = null;
  }

  createGame(createGameDto: CreateGameDto): Game {
    this.game = new Game();
    this.game.playerX = createGameDto.playerX;
    this.game.board = Array(9).fill(null);
    this.game.currentPlayer = this.game.playerX;
    this.game.isGameOver = false;

    return this.game;
  }

  joinGame(joinGameDto: JoinGameDto): Game {
    if (!this.game) {
      throw new NotFoundException(
        'Game not found. Please create a game first.',
      );
    }

    if (this.game.playerO) {
      throw new BadRequestException('Game is full');
    }

    this.game.playerO = joinGameDto.player;
    return this.game;
  }

  getGame(): Game {
    if (!this.game) {
      throw new NotFoundException('Game not started');
    }
    return this.game;
  }
}
