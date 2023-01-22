import World from './world';
import { EventEmitter } from '../../libs/events';

export type Sentence = string[];

export default class Sentences {
    public onChange = new EventEmitter<Sentence[]>();

    constructor (private world: World) {
        this.world.onChange.subscribe(() => {
            const words = this.world.all().filter(($) => $.type.startsWith('t/'));
            
            const minY = Math.min(...words.map(($) => $.position.y));
            const maxY = Math.max(...words.map(($) => $.position.y));
            const minX = Math.min(...words.map(($) => $.position.x));
            const maxX = Math.max(...words.map(($) => $.position.x));

            let rules = [];

            // Find all horizontal rulsentenceses
            for (let y = minY; y <= maxY; ++y) {
                const blocks = words.filter(($) => $.position.y === y).sort((a, b) => a.position.x < b.position.x ? -1 : 1);
                const sequences = blocks.map((block, index, collection) => collection.slice(index).filter(($, i) => $.position.x === block.position.x + i));
                rules = rules.concat(sequences.filter((s) => s.length > 2));                
            }
            
            // Find vertical sentences
            for (let x = minX; x <= maxX; ++x) {
                const blocks = words.filter(($) => $.position.x === x).sort((a, b) => a.position.y < b.position.y ? -1 : 1);
                const sequences = blocks.map((block, index, collection) => collection.slice(index).filter(($, i) => $.position.y === block.position.y + i));
                rules = rules.concat(sequences.filter((s) => s.length > 2));                
            }

            this.onChange.emitParallelSync(
                rules.map((rule) => rule.map(($) => $.type.substr(2)))
            );
        });
    }
};
