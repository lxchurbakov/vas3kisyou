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
    't': 'tree',
    'e': 't/tree',
    'a': 'water',
    'x': 't/water',
    'k': 't/kill',
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
    // First level to let people understand what is going on
    // Just vas3k here and go to flag to win
    process(`
t                
        t                         
t   v     t                     
    t    f             
                    
3iy gin                   

    `),
    // Second level - now we know that we can push walls
    // by introducing rule wall is push
    process(`
    t        t
    v   t      gin
t    t     w   t   
    3iy   wfw     
           w  lip                        
    t
    `),
    // Third level - we show that you can move words in
    // order to change the rules from flag is win to wall is win
    process(`
 t       t   w
     v      wfw
t  g  l   t  w
  3iy dip
   n
    `),   
    // WORD IS WIN
    process(`
t        t
     t v
  t       t
      d
     3iy
      p   n
        
    `),
// vas3k wants dollar and you win by making
// WALL IS YOU
process(`
      t   w   t
  t r   ww www
   dip w  v   wo
    n   w      t
        t3iy    w
   t  ww       t
     t   wtw tw
    w  l      w
     ttww w  w
         t wt
`), 
// now you have to become a dollar to
// move words somewhere else
process(`
     taww   
    t    t  dip
   a   vo w
   aa r   t 3i no
  aa  3iy w
   a     t
   aaa wt
      w
`),   
// Here you have to negatively break the rule that 
// does not let you go out
process(`
  twtwaaa www  dip
 w       a   t
 w v n   o i t
 w       awtw
 w rk3      a
 w      3iy a
  aaaaa    w
       wtwt   
`),

    // // First basic level to let people understand what to do
    // process(`
    //       w ww
    //      w w  ww
    //     w3iyw  vww
    //    w ginw  w fw
    //     ww   w   w
    //           ww
    // `),

    // // A level to make people sense game
    // // [
    // //     ,,,,,
    // //     [,,,,,'vas3k',,,,'flag'],
    // //     ,
    // //     [,,,,,'t/vas3k', 't/is', 't/you'],
    // //     [,,,,,'t/flag', 't/is', 't/win'],
    // // ],
    // // A level to make people move walls
    // [
    //     ,,,,,
    //     [,,,,,'vas3k',,,,      , 'wall'],
    //     [,,,,,       ,,,,'wall', 'flag', 'wall'],
    //     [,,,,,       ,,,,      , 'wall'],
    //     ,
    //     [,,,,,'t/vas3k', 't/is', 't/you'],
    //     [,,,,,'t/flag', 't/is', 't/win'],
    //     [,,,,,'t/wall', 't/is', 't/push'],
    // ],
    // // A level to make people move walls
    // process(` 


    //         v  www
    //            wfw
    //            www
    //     lg
    //     3iy dip 
    //      n
    // `),
    // // A level to introduce dollar
    // process(`


    //     v o
    //     3iy rin
    // `),
    // // Dollar is scared
    // process(`
    //            w 
    //       v    w o
    //            w   
    //      r   r   
    //     3iy dip
    //      s   n
    // `),
    // process(`
    //     v t
    //     3iy
    //     eip

    // `),
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