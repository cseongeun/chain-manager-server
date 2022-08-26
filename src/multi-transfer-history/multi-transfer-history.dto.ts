import { IsString } from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';

export class CreateMultiTransferHistoryBodyDTO {
  @DataTransporter({
    doc: { description: '보낸 주소' },
    props: [IsString()],
  })
  public readonly from: string;

  @DataTransporter({
    doc: { description: '받는 주소' },
    props: [IsString()],
  })
  public readonly to: string;

  @DataTransporter({
    doc: { description: '보낸 수량' },
    props: [IsString()],
  })
  public readonly amount: string;
}
