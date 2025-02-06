export class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen;
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  };

  displayInfo() {
    console.log(`${this.brand} ${this.model}, speed: ${this.speed} km/h`)
  }

  go() {
    if (this.isTrunkOpen = false && this.speed <= 195) {
      return this.speed += 5
    } 
  }
  brake() {
    if (this.speed >= 5) {
      return this.speed -= 5
    }
  }
  openTrunk() {
    
  }
  closeTrunk() {


  }

}
const car1 = new Car('Toyota', 'Corolla')
const car2 = new Car('Tesla', 'Model 3')

console.log(car1)
console.log(car2)
car1.go()
car1.go()
car2.go()
car1.displayInfo()
car2.displayInfo()