import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { MakeMoveDto } from './dto/make-move.dto';
import { Game } from './entities/game.entity';
import { Move } from './entities/move.entity';

@Injectable()
export class GameService {
  constructor(
      @InjectRepository(Game) private gameRepository: Repository<Game>,
      @InjectRepository(Move) private moveRepository: Repository<Move>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    try {
      const game = this.gameRepository.create({
        ...createGameDto,
        board: Array(9).fill(null),
        currentPlayer: 'X',
      });

      return await this.gameRepository.save(game);
    } catch (error) {
      console.error('Error creating game:', error);
      throw new InternalServerErrorException('An error occurred while creating the game');
    }
  }

  async join(id: string, joinGameDto: JoinGameDto): Promise<Game> {
    try {
      const game = await this.gameRepository.findOneBy({ id });

      if (!game) throw new NotFoundException('Game not found');

      if (game.playerO) throw new BadRequestException('Game is full');
      game.playerO = joinGameDto.player;

      return await this.gameRepository.save(game);
    } catch (error) {
      console.error('Error joining game:', error);
      throw new InternalServerErrorException('An error occurred while joining the game');
    }
  }

  async makeMove(id: string, makeMoveDto: MakeMoveDto): Promise<Game> {
    try {
      const game = await this.gameRepository.findOneBy({ id });
      if (!game) throw new NotFoundException('Game not found');

      if (game.board[makeMoveDto.position] !== null) {
        throw new BadRequestException('Position already taken');
      }

      game.board[makeMoveDto.position] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';

      return await this.gameRepository.save(game);
    } catch (error) {
      console.error('Error making move:', error);
      throw new InternalServerErrorException('An error occurred while making the move');
    }
  }

  async getGame(id: string): Promise<Game> {
    try {
      const game = await this.gameRepository.findOneBy({ id });

      if (!game) throw new NotFoundException('Game not found');

      return game;
    } catch (error) {
      console.error('Error retrieving game:', error);
      throw new InternalServerErrorException('An error occurred while retrieving the game');
    }
  }
}
