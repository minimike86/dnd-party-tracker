export enum Alignment {
  LG = 'Lawful Good',
  NG = 'Neutral Good',
  CG = 'Chaotic Good',
  LN = 'Lawful Neutral',
  N = 'Neutral',
  CN = 'Chaotic Neutral',
  LE = 'Lawful Evil',
  NE = 'Neutral Evil',
  CE = 'Chaotic Evil'
}

export function getAlignmentFullText(alignmentAcronym: string): string {
  switch (alignmentAcronym) {
    case 'LG': return Alignment.LG;
    case 'NG': return Alignment.NG;
    case 'CG': return Alignment.CG;
    case 'LN': return Alignment.LN;
    case 'N': return Alignment.N;
    case 'CN': return Alignment.CN;
    case 'LE': return Alignment.LE;
    case 'NE': return Alignment.NE;
    case 'CE': return Alignment.CE;
  }
}

export function getAlignmentAcronym(alignmentFullText: string): string {
  switch (alignmentFullText) {
    case Alignment.LG: return 'LG';
    case Alignment.NG: return 'NG';
    case Alignment.CG: return 'CG';
    case Alignment.LN: return 'LN';
    case Alignment.N: return 'N';
    case Alignment.CN: return 'CN';
    case Alignment.LE: return 'LE';
    case Alignment.NE: return 'NE';
    case Alignment.CE: return 'CE';
  }
}
