interface IPrototype {
  clone(): IPrototype;
}

class Shape implements IPrototype {
  x: number;
  y: number;

  private _random: number;

  constructor(prototype: Shape = undefined) {
    this._random = Math.random();
    if (prototype) {
      this.x = prototype.x;
      this.y = prototype.y;
      this._random = prototype._random;
    }
  }

  clone(): Shape {
    return new Shape(this);
  }
}

class Circle extends Shape {
  radius: number;

  constructor(prototype: Circle = undefined) {
    super(prototype);
    if (prototype) {
      this.radius = prototype.radius;
    }
  }

  clone(): Circle {
    return new Circle(this);
  }
}

export class PrototypeSample {
  constructor() {
    const c = new Circle();
    c.x = 5;
    c.y = 10;
    c.radius = 15;

    console.log(c, c.clone());
  }
}

