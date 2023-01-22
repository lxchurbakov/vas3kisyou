import _ from 'lodash';

import Canvas from '../core/canvas';
import Events from '../core/events';
import AssetsStore, { Image } from '../core/assets-store';

import { EventEmitter } from '../../libs/events';

const GRID_SIZE = 80;
const GRID_GAP = 5;

export default class World {
    private state = [];

    // public draw = {} as { [k: string]: 'text' | Image };
    public onChange = new EventEmitter<void>();

    constructor (private canvas: Canvas, private events: Events, private assets: AssetsStore) {
        this.canvas.onRender.subscribe((context: CanvasRenderingContext2D) => {
            context.imageSmoothingEnabled = false;

            this.state.forEach((entry) => {
                const img = this.assets.get(entry.type);

                if (img) {
                    context.drawImage(img, entry.position.x * (GRID_SIZE + GRID_GAP), entry.position.y * (GRID_SIZE + GRID_GAP), img.width * 10, img.height * 10);
                } else {
                    const str = entry.type.startsWith('t/') ? entry.type.substr(2) : entry.type;

                    context.font = '40px VT323';
                    context.textAlign = 'center';

                    context.fillStyle = '#ccc';
                    context.beginPath();
                    context.fillText(str, entry.position.x * (GRID_SIZE + GRID_GAP) + GRID_SIZE / 2, entry.position.y * (GRID_SIZE + GRID_GAP) + GRID_SIZE / 2 - 15);

                    context.fillStyle = '#00000030';
                    context.beginPath();
                    context.rect(entry.position.x * (GRID_SIZE + GRID_GAP) + GRID_SIZE * .2, entry.position.y * (GRID_SIZE + GRID_GAP) + GRID_SIZE * .8, GRID_SIZE * .6, 8);
                    context.fill();
                }
            });
        });

        this.onResolve.subscribe((request: string) => {
            return request === 'word' 
                ? this.get().filter(($) => $.type.startsWith('t/'))
                : this.get().filter(($) => $.type === request);
        });
    }

    public get = () => {
        return this.state;
    };

    public one = (id) => {
        return this.state.find(($) => $.id === id);
    };

    public remove = (id) => {
        return this.update((s) => s.filter(($) => $.id !== id));
    };

    public update = (predicate) => {
        this.state = predicate(this.state);
        this.onChange.emitParallelSync();
    };

    public onResolve = new EventEmitter<string>();

    public resolve = (request: string) => {
        return _.flatten(this.onResolve.emitParallelSync(request).filter(Boolean)).map(($) => $.id);
    };
};

// Grid just in case
//     // for (let x = 0; x < 10; ++x) {
//     //     for (let y = 0; y < 10; ++y) {
//     //         context.fillStyle = '#eeeeee';
//     //         context.beginPath();
//     //         context.rect(x * (GRID_SIZE + GRID_GAP), y * (GRID_SIZE + GRID_GAP), GRID_SIZE, GRID_SIZE);
//     //         context.fill();
//     //     }
//     // }
