import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { APIControllerExport } from '../app/decorator/controller-export.decorator';
import { Exception } from '../app/exception/exception';
import { EXCEPTION_CODE } from '../app/exception/exception.constant';
import { IJWTGuardRequest } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Network } from '../network/network.entity';
import { NetworkService } from '../network/network.service';
import { ROUTE } from './contract-execution.constant';
import {
  ContractExecutionDTO,
  ContractExecutionQueryDTO,
  CreateContractExecutionBodyDTO,
} from './contract-execution.dto';
import { ContractExecutionService } from './contract-execution.service';

@Controller(ROUTE.ROOT)
export class ContractExecutionController {
  constructor(
    private readonly contractExecutionService: ContractExecutionService,
    private readonly networkService: NetworkService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @APIControllerExport(Get())
  async getContractExecutions(
    @Request() req: IJWTGuardRequest,
    @Query() query: ContractExecutionQueryDTO,
  ) {
    const { chainId, address, name } = query;

    const condition: { network?: Network; address?: string; name?: string } =
      {};

    if (chainId) {
      const network = await this.networkService.findOne({ chainId });

      if (!network) {
        throw new Exception(EXCEPTION_CODE.ERR0007, HttpStatus.BAD_REQUEST);
      }

      condition.network = network;
    }

    if (address) {
      condition.address = address;
    }

    if (name) {
      condition.name = name;
    }

    const contractExecutions = await this.contractExecutionService.findAll({
      user: req.user,
      ...condition,
    });

    return contractExecutions.map((r) => new ContractExecutionDTO(r));
  }

  @UseGuards(JwtAuthGuard)
  @APIControllerExport(Post())
  async createContractExecution(
    @Request() req: IJWTGuardRequest,
    @Body() body: CreateContractExecutionBodyDTO,
  ) {
    const { chainId, name, address, abi } = body;
    console.log(chainId);
    const network = await this.networkService.findOne({ chainId });

    if (!network) {
      throw new Exception(EXCEPTION_CODE.ERR0007, HttpStatus.BAD_REQUEST);
    }

    const contractExecution = await this.contractExecutionService.createOne({
      user: req.user,
      network,
      name,
      address,
      abi,
    });

    return new ContractExecutionDTO(contractExecution);
  }
}
