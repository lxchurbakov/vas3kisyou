import Canvas from './canvas';
import Events from './events';
import AssetsStore from './assets-store';

import { add } from '../../libs/misc';
import { EventEmitter } from '../../libs/events';

import flag from 'url:../../assets/flag.png';
import vas3k from 'url:../../assets/vas3k.png';
import wall from 'url:../../assets/wall.png';
import water from 'url:../../assets/water.png';
import bug from 'url:../../assets/bug.png';
import dollar from 'url:../../assets/dollar.png';

export default class Frame {
    public mode = 'loading';
    public overlay = false;

    public onRenderGame = new EventEmitter<CanvasRenderingContext2D>();
    public onRenderOverGame = new EventEmitter<CanvasRenderingContext2D>();
    public onRenderOverlay = new EventEmitter<CanvasRenderingContext2D>();
    public onLoadingFinished = new EventEmitter<void>();

    public showOverlay = () => { this.overlay = true; };
    public hideOverlay = () => { this.overlay = false; };
    public toggleOverlay = () => { this.overlay = !this.overlay; };

    private offset = { x: 0, y: 0 };

    constructor (
        private canvas: Canvas,
        private events: Events,
        private assets: AssetsStore
    ) {
        Promise.all([
            this.assets.add('flag', flag),
            this.assets.add('vas3k', vas3k),
            this.assets.add('wall', wall),
            this.assets.add('wota', water),
            this.assets.add('bug', bug),
            this.assets.add('dollar', dollar),
            new Promise((resolve) => setTimeout(resolve, 1000)),
        ]).then(() => {
            this.mode = 'game';

            // Here we open the level
            this.onLoadingFinished.emitParallelSync();
        });

        const { width, height } = this.canvas.rect;

        this.canvas.onRender.subscribe((context) => {
            if (this.mode === 'loading') {
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
            }
        });

        this.canvas.onRender.subscribe((context) => {
            if (this.mode === 'game') {
                context.save();
                context.translate(this.offset.x, this.offset.y);
                this.onRenderGame.emitParallelSync(context);
                context.restore();
                this.onRenderOverGame.emitParallelSync(context);

                if (this.overlay) {
                    this.onRenderOverlay.emitParallelSync(context); 
                }
            }
        });

        this.events.onDrag.subscribe((p) => {
            this.offset = add(this.offset, p);
        });
    }
};
