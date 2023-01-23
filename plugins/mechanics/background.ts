import Frame from '../core/frame';

const generate = (amount: number) => new Array(amount).fill(0);
const range = (from: number, to: number) => Math.floor(Math.random() * (to - from)) + from;

export default class Background {
    constructor (
        private frame: Frame
    ) {
        this.frame.onRenderGame.subscribe((context) => {
            context.fillStyle = '#34474d';

            this.patches.forEach((patch) => {
                context.beginPath();
                context.rect(patch.x * 9, patch.y * 9, patch.w * 9, patch.h * 9);
                context.fill();
            });

            context.fillStyle = '#27574b';

            this.grass.forEach(({ x, y, stage }) => {
                context.beginPath();
                context.rect(x * 9, y * 9, 9, 9);
                context.fill();

                if (stage > 0) {
                    context.beginPath();
                    context.rect(x * 9, y * 9 - 9, 9, 9);
                    context.fill();
                }

                if (stage > 1) {
                    context.beginPath();
                    context.rect(x * 9 - 9, y * 9 - 18, 9, 9);
                    context.fill();
                }

                if (stage > 2) {
                    context.beginPath();
                    context.rect(x * 9 - 9, y * 9, 9, 9);
                    context.fill();
                }
            });
        }, -10);

        this.update();
    }

    private patches = [];
    private grass = [];

    public update = () => {
        this.patches = generate(range(100, 200)).map(() => ({
            x: range(-500, 500),
            y: range(-500, 500),
            w: range(1, 3),
            h: range(1, 2),
        }));

        this.grass = generate(range(100, 200)).map(() => ({
            x: range(-500, 500),
            y: range(-500, 500),
            stage: range(0, 4),
        }));
    };
};
