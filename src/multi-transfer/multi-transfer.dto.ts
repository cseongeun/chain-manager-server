import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';
import { CreateMultiTransferHistoryBodyDTO } from '../multi-transfer-history/multi-transfer-history.dto';
import { NetworkDTO } from '../network/network.dto';
import { MultiTransfer } from './multi-transfer.entity';

export class MultiTransferDetailParamDTO {
  @DataTransporter({
    doc: { description: '멀티 트랜스퍼 아이디' },
    props: [IsString()],
  })
  id: string;
}

export class MultiTransferDTO {
  constructor(multiTransfer: MultiTransfer) {
    Object.assign(this, {
      id: multiTransfer.id,
      network: new NetworkDTO(multiTransfer.network),
      hash: multiTransfer.hash,
      tokenAddress: multiTransfer.tokenAddress,
      memo: multiTransfer.memo,
    });
  }

  @DataTransporter({ doc: { description: '멀티 트랜스퍼 아이디' } })
  public readonly id: number;

  @DataTransporter({ doc: { description: '네트워크 정보' } })
  public readonly network: NetworkDTO;

  @DataTransporter({ doc: { description: '멀티 트랜스퍼 트랜잭션 해시' } })
  public readonly hash: string;

  @DataTransporter({ doc: { description: '멀티 트랜스퍼 대상 토큰 주소' } })
  public readonly tokenAddress: string;

  @DataTransporter({ doc: { description: '멀티 트랜스퍼 메모' } })
  public readonly memo: string;
}

export class MultiTransferQueryDTO {
  @DataTransporter({
    doc: { description: '네트워크 체인 아이디' },
    props: [IsNumber(), IsOptional()],
  })
  chainId?: number;

  @DataTransporter({
    doc: { description: '멀티 트랜스퍼 대상 토큰 주소' },
    props: [IsString(), IsOptional()],
  })
  tokenAddress?: string;

  @DataTransporter({
    doc: { description: '멀티 트랜스퍼 트랜잭션 해시' },
    props: [IsString(), IsOptional()],
  })
  hash?: string;
}

export class CreateMultiTransferBodyDTO {
  @DataTransporter({
    doc: { description: '네트워크 체인 아이디' },
    props: [IsNumber()],
  })
  public readonly chainId: number;

  @DataTransporter({
    doc: { description: '멀티 트랜스퍼 대상 토큰 주소' },
    props: [IsString()],
  })
  public readonly tokenAddress: string;

  @DataTransporter({
    doc: { description: '멀티 트랜스퍼 메모' },
    props: [IsString()],
  })
  public readonly memo: string;

  @DataTransporter({
    doc: { description: '멀티 트랜스퍼 트랜잭션 해시' },
    props: [IsString()],
  })
  public readonly hash: string;

  @DataTransporter({
    doc: {
      description: '멀티 트랜스퍼 히스토리',
      isArray: true,
      type: CreateMultiTransferHistoryBodyDTO,
    },
  })
  public readonly histories: CreateMultiTransferHistoryBodyDTO[];
}
