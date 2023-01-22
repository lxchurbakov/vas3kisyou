export type Point = { x: number, y: number };

export const same = (a: Point, b: Point) => 
    a.x === b.x && a.y === b.y;

export const add = (a: Point, b: Point) => 
    ({ x: a.x + b.x, y: a.y + b.y });

export const distance = (a: Point, b: Point) => {
    return Math.sqrt(
        Math.pow(a.x - b.x, 2) + 
        Math.pow(a.y - b.y, 2)
    );
};
