import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  findAll(): Promise<Article[]> {
    return this.articlesRepository.find();
  }

  findOne(id: number): Promise<Article> {
    return this.articlesRepository.findOne({ where: { id } });
  }

  create(article: Partial<Article>): Promise<Article> {
    return this.articlesRepository.save(article);
  }

  async update(id: number, article: Partial<Article>): Promise<Article> {
    await this.articlesRepository.update(id, article);
    return this.articlesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.articlesRepository.delete(id);
  }
}