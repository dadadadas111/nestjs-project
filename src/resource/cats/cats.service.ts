import { HttpException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from 'src/schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';  

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) { }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }


  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat){
      throw new HttpException(`Cat with ID "${id}" not found`, 404);
    }
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.catModel.findByIdAndUpdate(id, updateCatDto).exec();
    if (!cat){
      throw new HttpException(`Cat with ID "${id}" not found`, 404);
    }
    return cat;
  }

  async remove(id: string): Promise<Cat> {
    // find by id and delete
    const cat = await this.catModel.findByIdAndDelete(id).exec();
    if (!cat){
      throw new HttpException(`Cat with ID "${id}" not found`, 404);
    }
    return cat;
  }
}
