import { IsBooleanString, IsNumber, IsOptional } from 'class-validator';

export class GetNetworkDTO {
  @IsNumber()
  id: number;
}

export class GetNetworksDTO {
  @IsBooleanString()
  @IsOptional()
  testnet?: boolean;
}
