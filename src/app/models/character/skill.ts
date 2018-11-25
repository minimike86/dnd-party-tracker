export interface SkillId extends Skill {

  id: string;

}

export interface Skill {

  name: string;
  keyAbility: string;
  untrained: boolean;
  armorCheckPenaltyApplies: boolean;
  dblAcPenaltyApplies: boolean;
  synergies: Array<string>;

}

export function getDifficultyClassValue(text: string): number {
  switch ( text.toLowerCase() ) {
    case 'very easy': return 0;
    case 'easy': return 5;
    case 'average': return 10;
    case 'tough': return 15;
    case 'challenging': return 20;
    case 'formidable': return 25;
    case 'heroic': return 30;
    case 'nearly impossible': return 40;
  }
}

export function getDifficultyClassText(dc: number): string {
  if ( dc === 0 ) { return 'Very Easy'; }
  if ( dc <= 5 ) { return 'Easy'; }
  if ( dc <= 10 ) { return 'Average'; }
  if ( dc <= 15 ) { return 'Tough'; }
  if ( dc <= 20 ) { return 'Challenging'; }
  if ( dc <= 25 ) { return 'Formidable'; }
  if ( dc <= 30 ) { return 'Heroic'; }
  if ( dc <= 40 ) { return 'Nearly Impossible'; }
}
