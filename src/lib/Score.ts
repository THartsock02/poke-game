interface StatScore {
  key: string;
  value: number;
  pokemon: string | undefined;
}

interface Score {
  stats: StatScore[];
}
