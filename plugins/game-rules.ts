import Canvas from './canvas';
import Events from './events';
import AssetsStore from './assets-store';

import { EventEmitter } from '../libs/events';

import GameState from './game-state';

const GRID_SIZE = 80;
const GRID_GAP = 5;

export default class GameRules {
    private rules = [];

    public onRegenerate = new EventEmitter<any[]>();

    constructor (private state: GameState) {
        this.state.onChange.subscribe(() => {
            const state = this.state.get();

            let rules = [];
            // Find all horizontal rules
            for (let y = 0; y < 12; ++y) {
                const blocks = state.filter(($) => $.position.y === y).sort((a, b) => a.position.x < b.position.x ? -1 : 1);
                const sequences = blocks.map((block, index, collection) => collection.slice(index).filter(($, i) => $.position.x === block.position.x + i));
                rules = rules.concat(sequences.filter((s) => s.length > 2));                
            }
      
            for (let x = 0; x < 12; ++x) {
                const blocks = state.filter(($) => $.position.x === x).sort((a, b) => a.position.y < b.position.y ? -1 : 1);
                const sequences = blocks.map((block, index, collection) => collection.slice(index).filter(($, i) => $.position.y === block.position.y + i));
                rules = rules.concat(sequences.filter((s) => s.length > 2));                
            }

            this.rules = rules.map((rule) => rule.map(($) => $.type.substr(2)));

            this.onRegenerate.emitParallelSync(this.rules);
        });
    }
};
