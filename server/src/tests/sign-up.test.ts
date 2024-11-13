import request from 'supertest';
import app from '../index';
import {expect, jest, test, describe} from '@jest/globals';

describe('User sign-up Test',()=>{
    test('Should create a new user in the database.',async()=>{
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
          };
        const response = await request(app).post('/sign-up')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('message'); // Check for response structure
        expect(response.body.message).toBe('User created successfully'); // Adjust as per your response
    });

    test('should return a 400 status if any field is missing', async () => {
        const invalidUser = {
          username: 'testuser',
          email: 'testuser@example.com',
        }; // Missing password
    
        const response = await request(app)
          .post('/sign-up')
          .send(invalidUser)
          .expect('Content-Type', /json/)
          .expect(400); // Expected status code for bad request
    
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('All fields are required');
      });
    });
    
    describe('Render Tests', () => {
      test('should render a simple home page', async () => {
        const response = await request(app)
          .get('/')
          .expect('Content-Type', /json/)
          .expect(200);
    
        expect(response.body).toEqual({ Hello: 'World' });
      });
})