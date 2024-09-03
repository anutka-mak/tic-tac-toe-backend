import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Game } from '../game/entities/game.entity';
import { GameService } from '../game/game.service';

@Injectable()
export class MoveService {
  constructor(
      private readonly gameService: GameService,
  ) {}

  async makeMove(playerId: string, position: number): Promise<Game> {
    this.checkGameStarted();

    this.checkGameNotOver();

    this.checkPositionAvailable(position);

    this.updateBoard(position);

    if (this.checkWin()) {
      this.endGame();
    } else {
      this.switchPlayer();
    }

    return this.gameService.getGame();
  }

  private checkGameStarted(): void {
    const game = this.gameService.getGame();

    if (!game) {
      throw new NotFoundException('Game not started');
    }
  }

  private checkGameNotOver(): void {
    const game = this.gameService.getGame();

    if (game.isGameOver) {
      throw new BadRequestException('Game is over');
    }
  }

  private checkPositionAvailable(position: number): void {
    const game = this.gameService.getGame();

    if (game.board[position] !== null) {
      throw new BadRequestException('Position already taken');
    }
  }

  private updateBoard(position: number): void {
    const game = this.gameService.getGame();
    game.board[position] = game.currentPlayer === game.playerX ? 'X' : 'O';
  }

  private switchPlayer(): void {
    const game = this.gameService.getGame();
    game.currentPlayer = game.currentPlayer === game.playerX ? game.playerO : game.playerX;
  }

  private endGame(): void {
    const game = this.gameService.getGame();
    game.isGameOver = true;
  }

  private checkWin(): boolean {
    const game = this.gameService.getGame();
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        game.board[a] &&
        game.board[a] === game.board[b] &&
        game.board[a] === game.board[c]
      ) {
        return true;
      }
    }
    return false;
  }
}