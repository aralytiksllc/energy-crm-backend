// External

// Internal
import { CreateDocumentDto } from '../dtos/create-document.dto';

export class CreateDocumentCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly dto: CreateDocumentDto,
  ) {}
}
