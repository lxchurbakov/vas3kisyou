import World from './world';
import Rules from './rules';
import Movement from './movement';

import { distance, add } from '../../libs/misc';

export default class Enemy {
    private enemies = [];

    constructor (
        private world: World,
        private rules: Rules,
        private movement: Movement,
    ) {
        this.rules.onChange.subscribe((rules) => {
            this.enemies = [];

            rules.forEach((rule) => {
                if (rule[1] === 'is' && (rule[2] === 'angry' || rule[2] === 'scared')) {
                    const ids = this.world.resolve(rule[0]);

                    this.enemies.push({ ids, type: rule[2] });
                }
            });
        });

        this.movement.onAfterYouMove.subscribe(() => {
            this.enemies.forEach((enemy) => {
                enemy.ids.forEach((id) => {
                    const entity = this.world.one(id);
                    const nearest = this.movement.controlledEntitiesIds.map((id) => this.world.one(id)).sort((a, b) => {
                        return distance(a.position, entity.position) < distance(b.position, entity.position) ? -1 : 1;
                    })[0];

                    if (nearest) {
                        let step = { x: 0, y: 0 };
                        let factor = (enemy.type === 'scared') ? -1 : 1;

                        if ((Math.abs(entity.position.x - nearest.position.x) > Math.abs(entity.position.y - nearest.position.y))) {
                            step = { y: 0, x: (factor * (nearest.position.x - entity.position.x) / Math.abs(entity.position.x - nearest.position.x)) || 0 };
                        } else {
                            step = { x: 0, y: (factor * (nearest.position.y - entity.position.y) / Math.abs(entity.position.y - nearest.position.y)) || 0 };
                        }

                        // if (!Number.isNa)

                        this.movement.move(id, step);
                        this.world.commit();
                    }
                });
            });
        });
    }
};
