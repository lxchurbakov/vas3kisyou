import World from './world';
import { EventEmitter } from '../../libs/events';

export type Sentence = string[];

export default class Sentences {
    public onChange = new EventEmitter<Sentence[]>();

    constructor (private world: World) {
        this.world.onChange.subscribe(() => {
            const state = this.world.get().filter(($) => $.type.startsWith('t/'));

            let rules = [];

            // Find all horizontal rulsentenceses
            for (let y = 0; y < 12; ++y) {
                const blocks = state.filter(($) => $.position.y === y).sort((a, b) => a.position.x < b.position.x ? -1 : 1);
                const sequences = blocks.map((block, index, collection) => collection.slice(index).filter(($, i) => $.position.x === block.position.x + i));
                rules = rules.concat(sequences.filter((s) => s.length > 2));                
            }
            
            // Find vertical sentences
            for (let x = 0; x < 12; ++x) {
                const blocks = state.filter(($) => $.position.x === x).sort((a, b) => a.position.y < b.position.y ? -1 : 1);
                const sequences = blocks.map((block, index, collection) => collection.slice(index).filter(($, i) => $.position.y === block.position.y + i));
                rules = rules.concat(sequences.filter((s) => s.length > 2));                
            }

            this.onChange.emitParallelSync(
                rules.map((rule) => rule.map(($) => $.type.substr(2)))
            );
        });
    }
};
