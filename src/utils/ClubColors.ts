type ClubStyle = { label: string; borderClassName: string; dotClassName: string };

export const clubStyles: Partial<Record<string, ClubStyle>> = {
  KO: {
    label: 'Koalicja Obywatelska',
    borderClassName: 'border-party-ko',
    dotClassName: 'bg-party-ko',
  },
  PiS: { label: 'PiS', borderClassName: 'border-party-pis', dotClassName: 'bg-party-pis' },
  RozwojPlus: {
    label: 'Rozwój Plus',
    borderClassName: 'border-party-rozwoj-plus',
    dotClassName: 'bg-party-rozwoj-plus',
  },
  'PSL-TD': { label: 'PSL', borderClassName: 'border-party-psl', dotClassName: 'bg-party-psl' },
  Lewica: {
    label: 'Lewica',
    borderClassName: 'border-party-lewica',
    dotClassName: 'bg-party-lewica',
  },
  Konfederacja: {
    label: 'Konfederacja',
    borderClassName: 'border-party-konfederacja',
    dotClassName: 'bg-party-konfederacja',
  },
  Centrum: {
    label: 'Centrum',
    borderClassName: 'border-party-centrum',
    dotClassName: 'bg-party-centrum',
  },
  Polska2050: {
    label: 'Polska 2050',
    borderClassName: 'border-party-polska-2050',
    dotClassName: 'bg-party-polska-2050',
  },
  Razem: { label: 'Razem', borderClassName: 'border-party-razem', dotClassName: 'bg-party-razem' },
  Demokracja: {
    label: 'Demokracja Bezpośrednia',
    borderClassName: 'border-party-demokracja',
    dotClassName: 'bg-party-demokracja',
  },
  Konfederacja_KP: {
    label: 'Konfederacja Korony Polskiej',
    borderClassName: 'border-party-konfederacja-kp',
    dotClassName: 'bg-party-konfederacja-kp',
  },
  'niez.': {
    label: 'Niezrzeszeni',
    borderClassName: 'border-party-niezrzeszeni',
    dotClassName: 'bg-party-niezrzeszeni',
  },
};
