import { Router } from 'express';
import winston from '../config/winston';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const names = ['Alice', 'Bob', 'Eve'];
  names.forEach((str) => {
    winston.info(str.toUpperCase());
  });
  const changingString: Coordinate = {x: 1, y: 2};
  winston.info(changingString);

  const direction = Direction.UP;
  // const direction = 'UP'; // Argument of type '"UP"' is not assignable to parameter of type 'Direction'.
  const coord = printCoord<Coordinate>({x: 3, y: 7}, direction);

  // s is of type 'string'
  const s = firstElement(['a', 'b', 'c']);
  // n is of type 'number'
  const n = firstElement([1, 2, 3]);
  winston.info(`n is ${n}. s is ${s}`);

  res.json({title: 'Express', coord});
});

const enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
}

interface Coordinate {
  x: number;
  y: string | number;
  z?: string;
}

function firstElement<Type>(arr: any[][number]): number {
  return arr[0];
}

function printCoord<Type>(pt: Coordinate, direction: Direction): Coordinate {
  winston.info('The coordinate\'s x value is ' + pt.x);
  winston.info('The coordinate\'s y value is ' + pt.y);
  winston.info('The coordinate\'s Z value is ' + pt.z?.toUpperCase());
  winston.info('The direction is ' + direction);

  return pt;
}

export default router;
