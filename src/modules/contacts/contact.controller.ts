// External
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { type Contact } from '@/common/prisma/prisma.client';
import { CreateContactDto } from './dtos/create-contact.dto';
import { FindManyContactsDto } from './dtos/find-many-contacts.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { FindManyContactsPipe } from './pipes/find-many-contacts.pipe';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findMany(
    @Query(FindManyContactsPipe) dto: FindManyContactsDto,
  ): Promise<Paginate<Contact>> {
    return this.contactService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactService.delete(id);
  }
}
