import Canvas from '../core/canvas';
import Events from '../core/events';

import Frame from '../core/frame';

import World from '../mechanics/world';
import Movement from '../mechanics/movement';
import Completion from '../mechanics/completion';

import levels from '../../levels';

export default class Manager {
    private steps = 0;
    private level = 0;
    private won = false;
    private current = 0;

    public start = (index) => {
        const level = levels[index];

        this.current = index;
        this.world.state = level;
        this.steps = 0;
        this.won = false;
        this.world.commit();

        localStorage.setItem('last-level', index.toString())
    };

    constructor (
        private canvas: Canvas, 
        private events: Events, 
        private frame: Frame, 
        private world: World, 
        private movement: Movement, 
        private completion: Completion
    ) {
        this.frame.onLoadingFinished.subscribe(() => {
            this.start(Number(localStorage.getItem('last-level')) || 0)
        });

        this.movement.onAfterYouMove.subscribe(() => {
            this.steps++;
        });

        this.completion.onWin.subscribe(() => {
            this.won = true;
            this.frame.toggleOverlay();
        });

        this.events.onKeyDown.subscribe((code) => {
            if (code === 27) {
                if (this.frame.overlay && this.won) {} else {
                    this.frame.toggleOverlay();
                }   
            }

            if (code === 82) { // R
                this.start(this.current);
            }

            if (this.frame.overlay) {
                if (code === 32) {
                    this.start(this.level);
                    this.frame.toggleOverlay();
                }

                const W = 87;
                const A = 65;
                const S = 83;
                const D = 68;

                if (code === W) {
                    if (this.level % 3 !== 0) {
                        this.level--;
                        if (this.level < 0) {
                            this.level = 0;
                        }
                    }
                }

                if (code === S) {
                    if (this.level % 3 === 2) {
                        // this.level -= 2;
                    } else {
                        this.level++;
                        if (this.level >= levels.length) {
                            this.level = levels.length - 1;
                        }
                    }
                    
                }

                if (code === A) {
                    this.level -= 3;
                    while (this.level < 0) {
                        this.level += 3;
                    }
                }

                if (code === D) {
                    this.level += 3;
                    while (this.level >= levels.length) {
                        this.level -= 3;
                    }
                }
            }
        });

        this.frame.onRenderOverlay.subscribe((context) => {
            const { width, height } = this.canvas.rect;

            context.fillStyle = '#00000060';
            context.rect(0, 0, width, height);
            context.fill();

            if (this.won) {
                context.font = '80px VT323';
                context.textAlign = 'left';
                context.fillStyle = '#ccc';

                context.beginPath();
                context.fillText('Level Finished', 100, height / 2 - 350);
            }

            context.font = '40px VT323';
            context.textAlign = 'left';
            context.fillStyle = '#ccc';

            context.beginPath();
            context.fillText('Pick a level and hit space to start', 100, height / 2 - 250);

            const offset = { x: 100, y: height / 2 - 200 };
            const size = { x: 90, y: 90 };

            context.font = '50px VT323';
            context.textAlign = 'left';
            context.fillStyle = '#ccc';
            context.lineWidth = 3;

            levels.forEach((level, index) => {
                const x = Math.floor(index / 3);
                const y = index % 3;

                const color = index === this.level ? '#fff' : '#777';
                // const color = '#ccc';

                context.fillStyle = color;
                context.strokeStyle = color;

                context.beginPath();
                context.rect(x * size.x + offset.x, y * size.y + offset.y, size.x - 10, size.y - 10);
                context.stroke();

                context.beginPath();
                context.fillText((index + 1).toString(), x * size.x + offset.x + size.x / 2 - 14, y * size.y + offset.y + size.y / 2 + 9);
            });
        });

        this.frame.onRenderOverGame.subscribe((context) => {
            const { width, height } = this.canvas.rect;

            // TODO Render Top level info

            context.fillStyle = '#00000080';

            context.beginPath();
            context.rect(0, 0, width, 100);
            context.fill();

            context.font = '35px VT323';
            context.textAlign = 'left';
            context.fillStyle = '#ccc';

            context.beginPath();
            context.fillText(`Level ${this.current + 1}`, 50, 100 - 50 + 10);

            context.textAlign = 'right';

            context.beginPath();
            context.fillText(`${this.steps} steps made`, width - 50, 100 - 50 + 10);            
            
            // Render bottom highlights

            context.fillStyle = '#00000080';
            context.rect(0, height - 100, width, 100);
            context.fill();

            context.font = '35px VT323';
            context.textAlign = 'left';
            context.fillStyle = '#ccc';

            context.beginPath();
            context.fillText('WASD to move, R to restart, DRAG with mouse to look around', 50, height - 50 + 10);

            context.textAlign = 'right';

            context.beginPath();
            context.fillText('Press ESC to open menu', width - 50, height - 50 + 10);
        });
    }
};
