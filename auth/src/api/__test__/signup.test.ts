import request from 'supertest';
import { expect, it, describe } from '@jest/globals';
import App from '../../app';
import UserRoute from '../user/user.route';

const routes = [
    new UserRoute()
];
const app = new App(routes).app;
describe('UserRoute', () => {
    it('returns a 201 on successful signup', async () => {
        return request(app)
            .post('/api/v1/user/register')
            .send({
                first_name: 'Truong Gia',
                last_name: 'Bao',
                email: 'microservice@gmail.com',
                password: '123456',
            })
            .expect(201)
            .expect(res => {
                expect(res.body.first_name).toBe('Truong Gia');
                expect(res.body.last_name).toBe('Bao');
                expect(res.body.email).toBe('microservice@gmail.com');
            });
    });

    it('response with detail about the current user', async () => {
        const authResponse = await request(app)
            .post('/api/v1/user/register')
            .send({
                first_name: 'Truong Gia',
                last_name: 'Bao',
                email: 'microservice@gmail.com',
                password: '123456',
            })
            .expect(201);
        //get cookie from response
        const cookie = authResponse.get('Set-Cookie');
        const response = await request(app)
            .get('/api/v1/user/current-user')
            .set('Cookie', cookie)
            .send()
            .expect(200);
        expect(response.body.first_name).toBe('Truong Gia');
        expect(response.body.last_name).toBe('Bao');
        expect(response.body.email).toBe('microservice@gmail.com');
    });
});
