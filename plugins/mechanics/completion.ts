import World from './world';
import Rules from './rules';
import Movement from './movement';

import { EventEmitter } from '../../libs/events';
import { same } from '../../libs/misc';

export default class Completion {
    private idsToWin = [];

    public onWin = new EventEmitter<void>();

    constructor (private world: World, private movement: Movement, private rules: Rules) {
        this.rules.onChange.subscribe((rules) => {
            this.idsToWin = [];

            rules.forEach((rule) => {
                let entity = null;

                if (rule[1] === 'is' && rule[2] === 'win') {
                    entity = rule[0];
                } else if (rule[0] === 'win' && rule[1] === 'is') {
                    entity = rule[2];
                }

                if (entity !== null) {
                    const ids = this.world.resolve(entity);

                    this.idsToWin = this.idsToWin.concat(ids);

                    ids.forEach((whom) => {
                        // this.movement.movementType[id] = 'none';
                        // this.movement.collisionStrategies[id] = { type: 'none', for: this.world.ids() };
                        this.world.ids().forEach((who) => {
                            this.movement.collisionStrategies.push({ who, whom, how: 'pass' });
                        });
                        
                    });
                }
            });
        });

        this.movement.onAfterYouMove.subscribe(() => {
            const state = this.world.all();

            this.movement.controlledEntitiesIds.forEach((youid) => {
                this.idsToWin.forEach((winid) => {
                    const youentity = state.find(($) => $.id === youid);
                    const winentity = state.find(($) => $.id === winid);

                    if (same(youentity.position, winentity.position)) {
                        this.onWin.emitParallelSync();
                    }
                });
            });
        }, 100);
    }
};
