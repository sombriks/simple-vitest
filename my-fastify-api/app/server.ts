import Fastify, {type FastifyInstance} from 'fastify';
import {z} from "zod";
import {db} from "./database";
import {Todo, TodoSchema} from "./todo";

export const server: FastifyInstance = Fastify({logger: true});

const ParamSchema = z.object({
    id: z.coerce.number().min(1, 'invalid id')
})

const QuerySchema = z.object({
    q: z.string().optional().default('')
})

server.get('/status', async () => {
    return {message: 'ONLINE'}
});

server.get('/todos', async req => {
    const {q} = QuerySchema.parse(req.query)
    return db('todos').whereLike('description', `%${q}%`)
});

server.get('/todos/:id', async (req, res) => {
    const {id} = ParamSchema.parse(req.params)
    const result = await db('todos').where({id}).first()
    if (result) return result
    else res.status(404).send({message: 'not found'})
});

server.get('/todos/count', async req => {
    const {q} = QuerySchema.parse(req.query)
    return db('todos').whereLike('description', q).count('* as total')
});

server.post('/todos', async (req, res) => {
    const todo: Todo = TodoSchema.parse(req.body)
    const result = await db('todos').insert(todo).returning("*").first()
    res.status(201).header('location', `/todos/${result.id}`).send({message: 'created'})
});

server.put('/todos/:id', async (req, res) => {
    const {id} = ParamSchema.parse(req.params)
    const todo: Todo = TodoSchema.parse(req.body)
    todo.updated_at = new Date()
    const result = await db('todos').update(todo).where({id})
    res.status(303).header('location', '/todos').send({message: `${result} updated`})
});

server.delete('/todos/:id', async (req, res) => {
    const {id} = ParamSchema.parse(req.params)
    const result = await db('todos').del().where({id})
    res.status(303).header('location', '/todos').send({message: `${result} deleted`})
});
