import {
  IsBoolean,
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';
import { Network } from './network.entity';

export class NetworkDTO {
  constructor(network: Network) {
    Object.assign(this, {
      id: network.id,
      name: network.name,
      chainId: network.chainId,
      testnet: network.testnet,
      expolorer: network.explorer,
    });
  }

  @DataTransporter({ doc: { description: '네트워크 아이디' } })
  public readonly id: number;

  @DataTransporter({ doc: { description: '네트워크 이름' } })
  public readonly name: string;

  @DataTransporter({ doc: { description: '네트워크 체인 아이디' } })
  public readonly chainId: number;

  @DataTransporter({ doc: { description: '네트워크 테스트넷 여부' } })
  public readonly testnet: boolean;

  @DataTransporter({ doc: { description: '네트워크 익스플로어' } })
  public readonly explorer: string;
}

export class NetworkQueryDTO {
  @DataTransporter({
    doc: { description: '네트워크 체인 아이디' },
    props: [IsNumberString(), IsOptional()],
  })
  chainId?: number;

  @DataTransporter({
    doc: { description: '네트워크 명' },
    props: [IsString(), IsOptional()],
  })
  name?: string;

  @DataTransporter({
    doc: { description: '네트워크 테스트넷' },
    props: [IsBooleanString(), IsOptional()],
  })
  testnet?: boolean;
}
