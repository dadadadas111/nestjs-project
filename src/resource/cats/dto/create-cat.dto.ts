import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateCatDto {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(0)
    age: number;

    @IsNotEmpty()
    breed: string;
}
