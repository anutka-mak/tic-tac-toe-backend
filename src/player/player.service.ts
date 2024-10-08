import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = this.playerRepository.create(createPlayerDto);

    return await this.playerRepository.save(player);
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ id });

    if (!player) throw new NotFoundException('Player not found');

    return player;
  }

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }
}
