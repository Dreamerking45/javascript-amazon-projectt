export class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  };

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

    console.log(`${this.#brand} ${this.#model}, speed: ${this.speed} km/h, Trunk: ${trunkStatus}`)
  }

  go() {
    if (this.isTrunkOpen === false && this.speed <= 195) {
      return this.speed += 5
    } 
  }
  brake() {
    if (this.speed >= 5) {
      return this.speed -= 5
    }
  }
  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true
    }
  }
  closeTrunk() {
    this.isTrunkOpen = false;
  }


}
class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails)
    this.acceleration = carDetails.acceleration
  }
  go() {
    this.speed += this.acceleration

    if (this.speed > 300) {
      this.speed = 300;
    }
  }
  openTrunk() {
    console.log('Race cars do not have a trunk')
  }
  closeTrunk() {
    console.log('Race cars do not have a trunk')
  }

  go() {
    if (this.isTrunkOpen === false && this.speed < 300) {
      return this.speed += this.acceleration
    } 
  }

}
const car1 = new Car({brand: 'Toyota',model: 'Corolla'})
const car2 = new Car({brand: 'Tesla', model: 'Model 3'})
const racecar = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20})
console.log(car1)
console.log(car2)
car1.go()
car1.go()
car2.go()
car1.displayInfo()
car2.displayInfo()
car1.brake()
car1.displayInfo()
car1.openTrunk()
car1.displayInfo()
car1.go()
car1.openTrunk()
car1.closeTrunk()
car1.go();
car1.go()
car1.displayInfo()
car2.go()
car2.go()
car2.go()
car2.displayInfo()
racecar.go()
racecar.go()
racecar.go()
racecar.displayInfo()
racecar.openTrunk()
racecar.brake()
racecar.displayInfo()