import Canvas from './plugins/core/canvas';
import Events from './plugins/core/events';
import AssetsStore from './plugins/core/assets-store';

import Frame from './plugins/core/frame';
import Anmiations from './plugins/core/animations';

import World from './plugins/mechanics/world';
import Rules from './plugins/mechanics/rules';
import Background from './plugins/mechanics/background';

import Movement from './plugins/mechanics/movement';
import Completion from './plugins/mechanics/completion';
import Pushable from './plugins/mechanics/pushable';
import Killing from './plugins/mechanics/killing';
import Enemy from './plugins/mechanics/enemy';
import Mutation from './plugins/mechanics/mutation';

import Manager from './plugins/menu/manager';

// application

const app = document.getElementById('app');

const canvas = new Canvas(app);
const events = new Events(app);

const assets = new AssetsStore();

const frame = new Frame(canvas, events, assets);
const animations = new Anmiations(frame);

const world = new World(frame, assets);
const rules = new Rules(world);
const background = new Background(frame);

const movement = new Movement(events, frame, world, rules, animations);
const completion = new Completion(world, movement, rules);
const pushable = new Pushable(world, rules, movement);
const killing = new Killing(world, rules, movement);
const enemy = new Enemy(world, rules, movement, animations);
const mutation = new Mutation(world, rules);

const manager = new Manager(canvas, events, frame, background, world, movement, completion);
