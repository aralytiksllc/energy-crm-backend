// External

// Internal
import { UpdateDocumentDto } from '../dtos/update-document.dto';

export class UpdateDocumentCommand {
  constructor(
    public readonly id: number,
    public readonly file: Express.Multer.File,
    public readonly dto: UpdateDocumentDto,
  ) {}
}
