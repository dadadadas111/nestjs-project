export class Cat {
    private name: string;
    private age: number;
    private breed: string;

    constructor(name: string, age: number, breed: string) {
        this.name = name;
        this.age = age;
        this.breed = breed;
    }

    get getName(): string {
        return this.name;
    }

    set setName(value: string) {
        this.name = value;
    }

    get getAge(): number {
        return this.age;
    }

    set setAge(value: number) {
        this.age = value;
    }

    get getBreed(): string {
        return this.breed;
    }

    set setBreed(value: string) {
        this.breed = value;
    }
}