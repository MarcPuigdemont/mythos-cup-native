interface IToken {
  name: string;
  image: string;
  count: number;
}

interface ITokenPlay {
  name: string;
  image: string;
}

interface ICup {
  id: string,
  campaign: string;
  difficulty: string;
  icon: number;
  tokens: IToken[];
  
  revealedTokens: ITokenPlay[];
  unRevealedTokens: ITokenPlay[];
  playTokens: ITokenPlay[];
}

export { ICup, IToken, ITokenPlay };