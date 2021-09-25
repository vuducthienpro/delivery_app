import winston from '../config/winston';

interface StringValidator {
  isAcceptable(s: string): boolean;
}

const lettersRegexp = /^[A-Za-z]+$/;
const numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return lettersRegexp.test(s);
  }
}

// tslint:disable-next-line:max-classes-per-file
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// tslint:disable-next-line:max-classes-per-file
class Point {
  y: number;
  private xy;
  static xx: number = 20;

  // static name = 'S!'; // Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.

  constructor(public x: number = 0, y = 0) {
    this.xy = 100;
  }

  public scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }

  static printX() {
    return this.xx;
  }
}

// tslint:disable-next-line:max-classes-per-file
export default class RunningDemo {
  public static runValidation(req, res, next): any {
    // Some samples to try
    const strings = ['Hello', '98052', '101'];
// Validators to use
    const validators: { [s: string]: StringValidator } = {};
    validators['ZIP code'] = new ZipCodeValidator();
    validators['Letters only'] = new LettersOnlyValidator();
// Show whether each string passed each validator
    for (const s of strings) {
      // tslint:disable-next-line:forin
      for (const name in validators) {
        const isMatch = validators[name].isAcceptable(s);
        winston.info(`'${s}' ${isMatch ? 'matches' : 'does not match'} '${name}'.`);
      }
    }

    const point = new Point(2, 3);
    point.scale(5);

    return res.json({
      'run_validation': 1,
      point,
      static_point: Point.printX(),
    });
  }
}
