export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imagePath: string
    ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
