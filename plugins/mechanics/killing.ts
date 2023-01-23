import World from './world';
import Rules from './rules';
import Movement from './movement';

import { same } from '../../libs/misc';

export default class Killing {
    private relationships = [];

    constructor (private world: World, private rules: Rules, private movement: Movement) {
        this.rules.onChange.subscribe((rules) => {
            this.relationships = [];

            rules.forEach((rule) => {
                if (rule[1] === 'kill') {
                    const what = rule[0];
                    const whom = rule[2];

                    const whatids = this.world.resolve(what);
                    const whomids = this.world.resolve(whom);

                    this.relationships.push({
                        what: whatids,
                        whom: whomids,
                    });

                    whatids.forEach((a) => {
                        whomids.forEach((b) => {
                            this.movement.collisionStrategies.push({ who: a, whom: b, how: 'pass' });
                            this.movement.collisionStrategies.push({ who: b, whom: a, how: 'pass' });
                        });
                    });
                }
            });
        });

        this.movement.onAfterYouMove.subscribe(() => {
            this.relationships.forEach(({ what, whom }) => {
                what.forEach((whatid) => {
                    whom.forEach((whomid) => {
                        const whatentity = this.world.one(whatid);
                        const whomentity = this.world.one(whomid);

                        if (same(whatentity.position, whomentity.position)) {
                            this.world.remove(whomid);
                            this.world.commit();
                        }
                    });
                });                
            });
        });
    }
};