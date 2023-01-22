import Events from '../core/events';

import Frame from '../menu/frame';

import Rules from './rules';
import World, { Id, State } from './world';

import { Point, same, add } from '../../libs/misc';
import { EventEmitter } from '../../libs/events';

export type CollisionStrategy = null | 'pass' | 'push';

const W = 87;
const A = 65;
const S = 83;
const D = 68;

// Movements plugin, but essentialy a basic gaming plugin
// adds vas3k, adds wall and flag and
// basic rule with YOU IS X

// We also leave YOU silently unimplemented so YOU will resolve to nothing
// probably it would make sence to resolve it though, but we will have to
// introduce some kind of rules order that may get deadlocked when YOU IS YOU
// happens

export default class Movement {
    public onAfterYouMove = new EventEmitter<void>();
    public collisionStrategies = [] as { who: Id, whom: Id, how: CollisionStrategy }[];
    public controlledEntitiesIds = [] as Id[];   

    constructor (private events: Events, private frame: Frame, private world: World, private rules: Rules) {
        this.rules.onChange.subscribe((rules) => {
            this.collisionStrategies = [];
            this.controlledEntitiesIds = [];

            rules.forEach((rule) => {
                let entity = null;

                if (rule[1] === 'is' && rule[2] === 'you') {
                    entity = rule[0];
                } else if (rule[0] === 'you' && rule[1] === 'is') {
                    entity = rule[2];
                }

                if (entity !== null) {
                    this.controlledEntitiesIds = this.controlledEntitiesIds.concat(this.world.resolve(entity));
                }
            });
        });

        this.events.onKeyDown.subscribe((code) => {
            if (this.frame.visible) { return };

            const delta = getDelta(code);

            if (delta.x !== 0 || delta.y !== 0) {
                this.controlledEntitiesIds.forEach((id) => {
                    this.move(id, delta);
                });

                this.world.commit();
    
                this.onAfterYouMove.emitParallelSync();
            }
        });
    }

    public move = (id: Id, delta: Point) => {
        const state = this.world.all();
        const entity = this.world.one(id); // TODO check !entity

        const newPosition = add(entity.position, delta);
    
        let canMove = state.reduce((acc, $) => {
            if (same($.position, newPosition)) {
                const strategy = this.collisionStrategies.find(($$) => $$.who === id && $$.whom === $.id)
                
                if (strategy?.how === 'pass') {
                    return acc;
                }

                if (strategy?.how === 'push') {
                    return acc && this.move($.id, delta);
                }

                return false;
            }
            return acc;
        }, true);
    
        if (canMove) {
            this.world.set(id, { ...this.world.one(id), position: newPosition });
            // entity.position = newPosition;
        }
    
        return canMove;
    }; 
};

const getDelta = (code) => {
    if (code === W) {
        return { x: 0, y: -1 };
    } 

    if (code === S) {
        return { x: 0, y: 1 };
    } 

    if (code === A) {
        return { x: -1, y: 0 };
    } 

    if (code === D) {
        return { x: 1, y: 0 };
    }

    return { x: 0, y: 0 };
};


