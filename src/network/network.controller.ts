import { Controller, Get, Param, Query } from '@nestjs/common';
import { ROUTE } from './network.constant';
import { GetNetworkDTO, GetNetworksDTO } from './network.dto';
import { NetworkService } from './network.service';

@Controller(ROUTE.ROOT)
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Get(ROUTE.GET_NETWORK)
  async getNetwork(@Param() params: GetNetworkDTO) {
    const { id } = params;
    return this.networkService.findOne({ id });
  }

  @Get(ROUTE.GET_NETWORKS)
  async getNetworks(@Query() query: GetNetworksDTO) {
    console.log(query);
    return this.networkService.findAll(query);
  }
}
