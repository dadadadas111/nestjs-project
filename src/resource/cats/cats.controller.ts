import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/role.decorator';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';
import { AllExceptionsFilter } from 'src/all-exception-filter/all-exception-filter.filter';

@Controller('cats')
//@UseGuards(AuthGuard)
@UseFilters(AllExceptionsFilter)


export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  @Roles(['admin', 'user0'])
  @UseGuards(FirebaseAuthGuard)
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.catsService.findOne(id);
    } catch (error) {
      throw new HttpException(`Cat with ID "${id}" not found`, 404);
    }

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    try {
      return this.catsService.update(id, updateCatDto);
    } catch (error) {
      throw new HttpException(`Cat with ID "${id}" not found`, 404);
    }

  }

  @Delete(':id')
  @Roles(['admin', 'user0'])
  remove(@Param('id') id: string) {
    try {
      return this.catsService.remove(id);
    } catch (error) {
      throw new HttpException(`Cat with ID "${id}" not found`, 404);
    }

  }
}
