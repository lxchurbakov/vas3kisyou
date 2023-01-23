import Frame from '../core/frame';

const now = () => new Date().getTime();

const GRID_SIZE = 72;

const types = {
    puff: (context, factor) => {
        context.fillStyle = '#ccc';
        context.beginPath();
        context.rect(-10 * factor / 2, -10 * factor / 2, 10 * factor, 10 * factor);
        context.fill();
    },
    walk: (context, factor) => {
        context.fillStyle = '#ccc';
        context.globalAlpha = Math.max(0, 1 - factor);
        context.beginPath();
        context.rect(0, 0, 9, 9);
        context.fill();
        context.globalAlpha = 1;
    },
};

export default class Animations {
    private animations = [];

    public create = (position, type, duration) => {
        this.animations.push({
            position, type, start: now(), duration
        });
    };

    constructor (private frame: Frame) {
        // setInterval(() => {
        //     this.animations.push({
        //         position: { x: 10, y: 10 },
        //         type: 'walk',
        //         start: new Date().getTime(),
        //         duration: 1000,
        //     });
        // }, 1000);

        this.frame.onRenderGame.subscribe((context) => {
            const timestamp = new Date().getTime();

            this.animations.forEach((animation, index) => {
                const factor = (timestamp - animation.start) / animation.duration;

                if (factor > 1) {
                    setTimeout(() => {
                        this.animations = this.animations.filter((_, $) => $ !== index)
                    }, 0);
                }

                context.save();
                context.translate(animation.position.x * GRID_SIZE + GRID_SIZE / 2, animation.position.y * GRID_SIZE + GRID_SIZE / 2);
                types[animation.type](context, factor);

                context.restore();
            });
        }, 10);
    }
};
