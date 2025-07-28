import { z } from 'zod';

// const ageSchema = z.number().min(18).max(100).int();
// const userAge = 19

// const parseUserAge = ageSchema.parse(userAge);
// // const { data , error , success } = ageSchema.safeParse(userAge);
// console.log(parseUserAge);
// export const PORT = 3000;



// for string
const portSchema = z.coerce.number().min(1).max(65535).default(3000)
export const PORT = portSchema.parse(process.env.PORT)

