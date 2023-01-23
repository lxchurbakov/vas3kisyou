import Rules from './rules';
import Movement from './movement';
import World from './world';

export default class Pushable {
    constructor (private world: World, private rules: Rules, private movement: Movement) {
        this.rules.onChange.subscribe((rules) => {
            rules.forEach((rule) => {
                let entity = null;

                if (rule[0] === 'push' && rule[1] === 'is') {
                    entity = rule[2];
                } else if (rule[2] === 'push' && rule[1] === 'is') {
                    entity = rule[0];
                }

                if (entity !== null) {
                    const ids = this.world.resolve(entity);

                    ids.forEach((whom) => {
                        this.world.ids().forEach((who) => {
                            this.movement.collisionStrategies.push({ who, whom, how: 'push' });
                        });
                    });
                }
            });
        });
    }    
};
