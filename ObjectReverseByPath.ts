type ExtractPathKeys<O extends any> = {
  [K in keyof O]: O[K]['path'];
}[keyof O];

type FilteredKeys<T extends any, Path extends string, U> = {
  [P in keyof T]: T[P][Path] extends U ? P : never;
}[keyof T];

type ByPaths<O extends any, K extends any> = {
  [Key in K]: {
    [KK in FilteredKeys<O, 'path', Key>]: O[KK]['value'];
  };
};

export type ReverseByPath<T> = ByPaths<T, ExtractPathKeys<T>>

/*
const source = {
  a: {
      path: 'x',
      value: 1,
  },
  b: {
      path: 'y',
      value: 3,
  },
  c: {
      path: 'x',
      value: 'dsa',
  },
} as const;

after ReverseByPath<typeof source>

will be

{
  x: {
    a: 1,
    c: 'dsa'
  },
  {
    b: 3
  }
}

*/
