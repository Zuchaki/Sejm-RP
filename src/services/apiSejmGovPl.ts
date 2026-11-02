const baseUrl = 'https://api.sejm.gov.pl';
const term = 10;

export const apiSejmGovPl = {
  sejm: {
    term: {
      mp: {
        _root: `${baseUrl}/sejm/term${term}/MP`,
        detail: (envoyId: number) => ({
          photo: `${baseUrl}/sejm/term${term}/MP/${envoyId}/photo`,
          photoMini: `${baseUrl}/sejm/term${term}/MP/${envoyId}/photo-mini`,
        }),
      },
    },
  },
};
