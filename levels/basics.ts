// e - empty
// v - vas3k

const mapping = {
    ' ': null,
    'v': 'vas3k',
    'w': 'wall',
    'f': 'flag',
    '3': 't/vas3k',
    'i': 't/is',
    'y': 't/you',
    'g': 't/flag',
    'n': 't/win',
    'd': 't/word',
    'l': 't/wall',
    'p': 't/push',
    'o': 'dollar',
    'r': 't/dollar',
    's': 't/scared',
};

const process = (s: string) => {
    return (`
    
    
    ` + s).split('').reduce((acc, c) => {
        if (c === '\n') {
            acc.push([]);
        }

        acc[acc.length - 1].push(mapping[c]);

        return acc;        
    }, [[]] as any[]);
};


export default [
    // First basic level to let people understand what to do
    process(`
          w ww
         w w  ww
        w3iyw  vww
       w ginw  w fw
        ww   w   w
              ww
    `),

    // A level to make people sense game
    // [
    //     ,,,,,
    //     [,,,,,'vas3k',,,,'flag'],
    //     ,
    //     [,,,,,'t/vas3k', 't/is', 't/you'],
    //     [,,,,,'t/flag', 't/is', 't/win'],
    // ],
    // A level to make people move walls
    [
        ,,,,,
        [,,,,,'vas3k',,,,      , 'wall'],
        [,,,,,       ,,,,'wall', 'flag', 'wall'],
        [,,,,,       ,,,,      , 'wall'],
        ,
        [,,,,,'t/vas3k', 't/is', 't/you'],
        [,,,,,'t/flag', 't/is', 't/win'],
        [,,,,,'t/wall', 't/is', 't/push'],
    ],
    // A level to make people move walls
    process(` 


            v  www
               wfw
               www
        lg
        3iy dip 
         n
    `),
    // A level to introduce dollar
    process(`


        v o
        3iy rin
    `),
    // Dollar is scared
    process(`
               w 
          v    w o
               w   
         r   r   
        3iy dip
         s   n
    `)
    // Bugs?
    // Dollar is scared
    // Water kills vas3k
    // doors and keys
    // transform to many walls
    // A level to make people
    // move walls
    // water
    // bug
    // door
    // 

    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
    // [
    //     [ , , , 'vas3k', , 'flag', 'bug'],
    //     [ , , , 'wall'],
    //     ,
    //     [, 't/vas3k', 't/is', 't/you'],
    //     ,
    //     [, 't/flag', 't/is', 't/win'],
    //     ,
    //     [, 't/wall', 't/is', 't/push'],
    //     [,,,,,'bug'],
    //     ,
    //     [, 't/word', 't/is', 't/push'],
    //     [, 't/wota', 't/kill', 't/vas3k'],
    //     [, 't/bug', 't/is', 't/scared'],
    //     [, 'wota', 'wota'],
    // ],
];

// constructor (private canvas: Canvas, private events: Events) {
//     let state = [
        
//         { id: 1, type: 'wall', position: { x: 2, y: 1 } },
//         { id: 2, type: 'flag', position: { x: 3, y: 1 } },

//         { id: 0, type: 'vas3k', position: { x: 1, y: 1 } },

//         { id: 10, type: 't/vas3k', position: { x: 3, y: 5 } },
//         { id: 11, type: 't/is', position: { x: 4, y: 5 } },
//         { id: 12, type: 't/you', position: { x: 5, y: 5 } },

//         { id: 13, type: 't/flag', position: { x: 3, y: 7 } },
//         { id: 14, type: 't/is', position: { x: 4, y: 7 } },
//         { id: 15, type: 't/win', position: { x: 5, y: 7 } },

//         { id: 16, type: 't/wall', position: { x: 3, y: 9 } },
//         { id: 17, type: 't/is', position: { x: 4, y: 9 } },
//         { id: 18, type: 't/push', position: { x: 5, y: 9 } },

//         { id: 19, type: 't/t/', position: { x: 3, y: 11 } },
//         { id: 20, type: 't/is', position: { x: 4, y: 11 } },
//         { id: 21, type: 't/push', position: { x: 5, y: 11 } },

//         { id: 22, type: 't/you', position: { x: 5, y: 12 } },
//         { id: 23, type: 't/dollar', position: { x: 4, y: 12 } },


//         // { id: 1, type: 'rock', position: { x: 5, y: 5 } },
//         // { id: 1, type: 'wtf', position: { x: 4, y: 4 } },
//     ] as any[];