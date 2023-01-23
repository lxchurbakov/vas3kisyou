import _ from 'lodash';

import Frame from '../core/frame';
import AssetsStore from '../core/assets-store';

import { EventEmitter } from '../../libs/events';
import { Point } from '../../libs/misc';

const GRID_SIZE = 72;
const PIXEL_FACTOR = 9;

export type Id = number;
export type State = { id: Id; type: string; position: Point }[];

// TODO make flexy with plugins
const prioirty = [
    'flag',
    'vas3k',
    'bug',
    'wall',
];

const byPriority = (a, b) => {
    const aindex = prioirty.findIndex(($) => $ === a.type);
    const bindex = prioirty.findIndex(($) => $ === b.type);

    return aindex < bindex ? -1 : 1;
};

export default class World {
    public state = [] as State;

    // public draw = {} as { [k: string]: 'text' | Image };
    public onChange = new EventEmitter<void>();

    constructor (private frame: Frame, private assets: AssetsStore) {
        this.frame.onRenderGame.subscribe((context: CanvasRenderingContext2D) => {
            context.imageSmoothingEnabled = false;

            this.state.sort(byPriority).forEach((entry) => {
                const img = this.assets.get(entry.type);
                const pos = { x: entry.position.x * (GRID_SIZE), y: entry.position.y * (GRID_SIZE) };

                if (img) {
                    const size = { x: img.width * PIXEL_FACTOR, y: img.height * PIXEL_FACTOR };

                    context.drawImage(img, pos.x + GRID_SIZE / 2 - size.x / 2, pos.y + GRID_SIZE - size.y, size.x, size.y);
                } else {
                    let str = entry.type.startsWith('t/') ? entry.type.slice(2) : entry.type;
                    // str = str.length > 5 ? str.slice(0, 3).split('').concat(['\n']).concat(str.slice(3).split('')).join('') : str;

                    context.font = '35px VT323';
                    context.textAlign = 'center';

                    context.fillStyle = '#ccc';
                    context.beginPath();
                    context.fillText(str, entry.position.x * (GRID_SIZE) + GRID_SIZE / 2, entry.position.y * (GRID_SIZE) + GRID_SIZE / 2 + 10);
                    context.closePath();

                    context.fillStyle = '#00000030';
                    context.beginPath();
                    context.rect(entry.position.x * (GRID_SIZE) + GRID_SIZE * .2, entry.position.y * (GRID_SIZE) + GRID_SIZE * .9, GRID_SIZE * .6, 8);
                    context.fill();
                    context.closePath();
                }
            });
        });

        this.onResolve.subscribe((request: string) => {
            return request === 'word' 
                ? this.all().filter(($) => $.type.startsWith('t/'))
                : this.all().filter(($) => $.type === request);
        });
    }

    public all = () => {
        return this.state;
    };

    public ids = () => {
        return this.all().map(($) => $.id);
    };

    public set = (id: Id, entity: any) => {
        this.state = this.state.map(($) => $.id === id ? entity : $);
    };

    public patch = (id: Id, data: any) => {
        this.state = this.state.map(($) => $.id === id ? { ...$, ...data }: $);
    };  

    public one = (id) => {
        return this.state.find(($) => $.id === id);
    };

    public remove = (id) => {
        this.state = this.state.filter(($) => $.id !== id);
    };

    public commit = () => {
        this.onChange.emitParallelSync();
    };

    public onResolve = new EventEmitter<string>();

    public resolve = (request: string) => {
        return _.flatten(this.onResolve.emitParallelSync(request).filter(Boolean)).map(($) => $.id);
    };
};
