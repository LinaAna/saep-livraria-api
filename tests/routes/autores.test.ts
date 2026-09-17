import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';


beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de autores', () => {
     test('GET /autores devolve status 200 e devolver 3 autores', async () =>{
        const res = await request(app).get('/autores')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3);
     })

     test('GET /autores/1 devolver status 200 e nome', async () => {
        const res = await request(app).get('/aditoras/1')
         expect(res.status).toBe(200)
         expect(res.body.name).toBe('lynn painter')
     })
     test('GET /autores/999 e devolver status 404', async () => {
        const res = await request(app).get('/autores/id')
        expect(res.status).toBe(404)
     })
     test('POST /autores` válido (`{ nome, nacionalidade }`) → 201 com `id` no corpo', async () => {
        const res = await request(app).post('/autores')
        .send(
            {
                nome: 'lynn painter',
                nacionalidade: 'estadunidence'
            }
        )

        expect(res.status).toBe(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: '1'
            })
        );
     })

     test('POST /autores com body vazio → 400', async () => {
        const res = await request(app).post('/autores')
        expect(res.status).toBe(400)
     })
     test('PUT /autores/1 (`{ nacionalidade }`) → 200 com a nacionalidade nova', async () => {
        const res = await request(app).post('autores/1')
     })
     test.todo('PUT /autores/999 → 404')
     test.todo('DELETE /autores/3 → 204')
     test.todo('DELETE /autores/999 → 404')
     test.todo('GET /autores/1/livros → 2 livros')
     test.todo('GET /autores/3/livros → 1 livro')
});