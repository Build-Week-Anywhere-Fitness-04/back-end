require('dotenv').config();
const request = require('supertest');
const server = require('../../../index');
const db = require('../../../../data/db');

describe('Test instructors auth routes', () => {
    const test_user = {
        username: 'newuserfromtesting',
        password: '321654987',
        first_name: 'Fabricio',
        last_name: 'Bezerra',
        email: 'test@test.com',
        phone: '7020000000'
    }

    beforeEach(async () => {
        await db("instructors").truncate(); // empty the table and reset the id back to 1
    });

    describe('POST /api/auth/instructors/register', () => {
        it('should return 201 status', async () => {
            const res = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user);
            expect(res.status).toBe(201);
        });
    });

    describe('POST /api/auth/instructors/login', () => {
        it('should return 200 status after login', async () => {
            let res = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user);

            res = await request(server)
                .post('/api/auth/instructors/login')
                .send({
                    username: test_user.username,
                    password: test_user.password
                });                
            
            expect(res.status).toBe(200);
        });

        it('checks if it returns an object with id and token', async () => {
            let res = await request(server)
                .post('/api/auth/instructors/register')
                .send(test_user);

            res = await request(server)
                .post('/api/auth/instructors/login')
                .send({
                    username: test_user.username,
                    password: test_user.password
                });                
            
            expect(Object.keys(res.body)).toEqual(['token', 'id']);
        });
    });

})