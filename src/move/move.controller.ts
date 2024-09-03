import { Controller, Post, Body, Param } from '@nestjs/common';
import { MoveService } from './move.service';

@Controller('move')
export class MoveController {
  constructor(
      private readonly moveService: MoveService,
  ) {}

  @Post(':playerId')
  async makeMove(
      @Param('playerId') playerId: string,
      @Body('position') position: number,
  ) {
    return this.moveService.makeMove(playerId, position);
  }
}
