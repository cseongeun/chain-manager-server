import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import dataSource from '../app/database/database.source';
import { MULTI_TRANSFER_HISTORY_REPOSITORY_PROVIDE } from '../multi-transfer-history/multi-transfer-history.constant';
import { MultiTransferHistory } from '../multi-transfer-history/multi-transfer-history.entity';
import { MULTI_TRANSFER_REPOSITORY_PROVIDE } from './multi-transfer.constant';
import { MultiTransferDTO } from './multi-transfer.dto';
import { MultiTransfer } from './multi-transfer.entity';

@Injectable()
export class MultiTransferService {
  private relations = ['network', 'user', 'histories'];

  constructor(
    @Inject(MULTI_TRANSFER_REPOSITORY_PROVIDE)
    private multiTransferRepository: Repository<MultiTransfer>,
    @Inject(MULTI_TRANSFER_HISTORY_REPOSITORY_PROVIDE)
    private multiTransferHistoryRepository: Repository<MultiTransferHistory>,
  ) {}

  async findOneById(id: number): Promise<MultiTransfer> {
    return this.multiTransferRepository.findOne({ where: { id } });
  }

  async findOne(params: DeepPartial<MultiTransfer>): Promise<MultiTransfer> {
    return this.multiTransferRepository.findOne({
      where: { ...params },
      relations: this.relations,
    });
  }

  async findAll(params: DeepPartial<MultiTransfer>): Promise<MultiTransfer[]> {
    return this.multiTransferRepository.find({
      where: { ...params },
      relations: this.relations,
    });
  }

  async createOne(params: DeepPartial<MultiTransfer>): Promise<MultiTransfer> {
    return this.multiTransferRepository.save({
      ...params,
    });
  }

  async deleteOne(params: DeepPartial<MultiTransfer>): Promise<DeleteResult> {
    return this.multiTransferRepository.delete({ ...params });
  }
}
