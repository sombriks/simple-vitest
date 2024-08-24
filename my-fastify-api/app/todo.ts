import {z} from 'zod';

export const TodoSchema = z.object({
    id: z.number().positive('invalid id').optional(),
    description: z.string().min(1,'description can not be empty'),
    done: z.boolean().default(false),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional()
});

export type Todo = z.infer<typeof TodoSchema>;
//// inferred schema
// export type Todo = {
//     id?: number
//     description: string
//     done?: boolean
//     created_at?: Date
//     updated_at?: Date
// }
