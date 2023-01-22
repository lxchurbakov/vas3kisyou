import Canvas from '../core/canvas';
import Events from '../core/events';
import AssetsStore from '../core/assets-store';

import { add } from '../../libs/misc';
import { EventEmitter } from '../../libs/events';

import flag from 'url:../../assets/flag.png';
import vas3k from 'url:../../assets/vas3k.png';
import wall from 'url:../../assets/wall.png';
import water from 'url:../../assets/water.png';
import bug from 'url:../../assets/bug.png';
import dollar from 'url:../../assets/dollar.png';

class Monad {
    constructor (public state, public meta = null) {}
    public with = (config) => config[this.state](this.meta);
    public update = (state, meta = null) => { this.state = state; this.meta = meta; };
};

export default class Frame {
    public loading = true;
    public visible = false;

    public onRenderInterface = new EventEmitter<CanvasRenderingContext2D>();
    public onRenderGame = new EventEmitter<CanvasRenderingContext2D>();
    public onLoadingFinished = new EventEmitter<void>();
    public onRenderMenu = new EventEmitter<CanvasRenderingContext2D>();

    private offset = { x: 0, y: 0 };

    public toggle = () => { this.visible = !this.visible; };

    constructor (private canvas: Canvas, private events: Events, private assets: AssetsStore) {
        const { width, height } = this.canvas.rect;

        // this.offset.x = width / 2;
        // this.offset.y = height / 2;

        Promise.all([
            assets.add('flag', flag),
            assets.add('vas3k', vas3k),
            assets.add('wall', wall),
            assets.add('wota', water),
            assets.add('bug', bug),
            assets.add('dollar', dollar),
            new Promise((resolve) => setTimeout(resolve, 1000)),
        ]).then(() => {
            this.loading = false;

            // Here we open the level
            this.onLoadingFinished.emitParallelSync();
        });

        this.events.onDrag.subscribe((p) => {
            this.offset = add(this.offset, p);
        });

        this.canvas.onRender.subscribe((context) => {
            if (this.loading) {
                const position = { x: width / 2, y: height / 2 };

                context.font = '60px VT323';
                context.textAlign = 'center';
        
                context.fillStyle = '#333';
                context.beginPath();
                context.fillText('Assets is loading', position.x , position.y + 5);

                context.fillStyle = '#ccc';
                context.beginPath();
                context.fillText('Assets is loading', position.x , position.y);
        
                context.fillStyle = '#00000030';
                context.beginPath();
                context.rect(position.x - 200, position.y + 40, 400, 8);
                context.fill();
            } else {
                context.save();
                context.translate(this.offset.x, this.offset.y);
                this.onRenderGame.emitParallelSync(context);
                context.restore();

                if (this.visible) {
                    this.onRenderMenu.emitParallelSync(context);
                } else {
                    this.onRenderInterface.emitParallelSync(context);
                }
            }
        });        
    }
};
