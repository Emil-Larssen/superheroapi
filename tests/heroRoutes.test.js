
const request = require('supertest');
const app = require('../app');

describe('Superhero API', () => {

    test('GET /superheroes returns superheroes', async () => {
        const response = await request(app).get('/superheroes');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('fullName');
        expect(response.body[0]).toHaveProperty('strength');
        expect(response.body[0]).toHaveProperty('image');
    });

    test('GET /superheroes/1 returns a specific superhero', async () => {
        const response = await request(app).get('/superheroes/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('GET /superheroes/999999 returns 404', async () => {
        await request(app)
            .get('/superheroes/999999')
            .expect(404);
    });
});

describe('Favorites API', () => {

    const favorite = {
        id: 1,
        note: 'My favorite superhero'
    };

    test('POST /favorites creates a favorite', async () => {
        await request(app)
            .post('/favorites')
            .send(favorite)
            .expect(201);
    });

    test('GET /favorites returns saved favorites', async () => {
        const response = await request(app)
            .get('/favorites')
            .expect(200);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(favorite)
            ])
        );
    });

    test('POST /favorites rejects duplicate favorites', async () => {
        await request(app)
            .post('/favorites')
            .send(favorite)
            .expect(409);
    });

    test('POST /favorites rejects invalid input', async () => {
        await request(app)
            .post('/favorites')
            .send({ id: 2 })
            .expect(400);
    });

    test('DELETE /favorites/1 deletes the favorite', async () => {
        await request(app)
            .delete('/favorites/1')
            .expect(204);
    });

    test('DELETE /favorites/1 returns 404 when missing', async () => {
        await request(app)
            .delete('/favorites/1')
            .expect(404);
    });
});
