interface IToken {
  name: string;
  image: string;
  count: number;
}

interface ICup {
  id: string,
  campaign: string;
  difficulty: string;
  icon: number;
  tokens: IToken[];
}

export { ICup, IToken};