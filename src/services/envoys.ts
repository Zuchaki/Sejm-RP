import axios from 'axios';
import * as z from 'zod';
import { apiSejmGovPl } from './apiSejmGovPl';

const envoySchema = z.object({
  id: z.number(),
  active: z.boolean(),
  firstName: z.string(),
  secondName: z.string().optional(),
  lastName: z.string(),
  firstLastName: z.string(),
  lastFirstName: z.string(),
  accusativeName: z.string(),
  genitiveName: z.string(),
  club: z.string(),
  districtName: z.string(),
  districtNum: z.number(),
  voivodeship: z.string(),
  birthDate: z.string(),
  birthLocation: z.string(),
  educationLevel: z.string(),
  profession: z.string().optional(),
  email: z.string(),
  numberOfVotes: z.number(),
  oathDate: z.string(),
  inactiveCause: z.string().optional(),
  mandateExpiryDate: z.string().optional(),
  waiverDesc: z.string().optional(),
});

export const getEnvoys = async () => {
  const { data } = await axios.get(apiSejmGovPl.sejm.term.mp._root);

  return z.array(envoySchema).parse(data);
};

export const getEnvoyPhoto = async (envoyId: number, options?: { size: 'full' | 'mini' }) => {
  const photoUrls = apiSejmGovPl.sejm.term.mp.detail(envoyId);
  const url = options?.size === 'mini' ? photoUrls.photoMini : photoUrls.photo;

  const { data, headers } = await axios.get(url, { responseType: 'arraybuffer' });

  const contentType = z.string().startsWith('image/').parse(headers['content-type']);

  return `data:${contentType};base64,${Buffer.from(data).toString('base64')}`;
};
