import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private BookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.BookRepository.save(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return await this.BookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const bookfound = await this.BookRepository.findOneBy({ id });
    if (!bookfound) {
      throw new NotFoundException(`paqs de bouquin avec l'id : ${id}`);
    }
    return bookfound;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const upBook = await this.findOne(id);
    upBook.dateParution = updateBookDto.dateParution;
    return await this.BookRepository.save(upBook);
  }

  async remove(id: number): Promise<string> {
    const result = await this.BookRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`paqs de bouquin avec l'id : ${id}`);
    }
    return `the book with id #${id} burning`;
  }
}
