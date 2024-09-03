import { Module } from '@nestjs/common';
import { MoveService } from './move.service';
import { MoveController } from './move.controller';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    GameModule,
  ],
  providers: [MoveService],
  controllers: [MoveController],
})
export class MoveModule {}
