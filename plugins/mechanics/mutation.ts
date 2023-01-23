import World from './world';
import Rules from './rules';

const SIMPLE_BLOCKS = ['vas3k', 'wall', 'flag', 'dollar', 'water', 'bug'];

export default class Mutation {
    constructor (
        private world: World,
        private rules: Rules,
    ) {
        this.rules.onChange.subscribe((rules) => {
            let somethingHasChanged = false;

            rules.forEach((rule) => {
                if (
                    SIMPLE_BLOCKS.includes(rule[0])
                    && rule[1] === 'is'
                    && SIMPLE_BLOCKS.includes(rule[2])
                ) {
                    const [entity,,type] = rule;

                    this.world.resolve(entity).forEach((id) => {
                        this.world.patch(id, { type });
                        somethingHasChanged = true;
                    });
                }
            });

            if (somethingHasChanged) {
                this.world.commit();
            }
        });
    }
};
