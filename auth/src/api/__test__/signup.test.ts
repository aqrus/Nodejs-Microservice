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
        return await request(app)
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
});
