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
