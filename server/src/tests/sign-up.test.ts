import request from 'supertest';
import app, {server} from '../index';
import mongoose from 'mongoose';
import {expect, test, describe} from '@jest/globals';

const testDbUrl = 'mongodb://localhost:27017/testDb';
beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(testDbUrl);
  
    // Start the server
    await app.listen(3000);
  });
  
  afterAll(async () => {
    // Close the database connection after tests are done
    await mongoose.connection.close();
  
    // Close the server
    await server.close();
  });
  
  
  describe('User sign-up Test', () => {
    test('Should create a new user in the database.', async () => {
      const newUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      };
      const response = await request(app)
        .post('/sign-up')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201); // You should use 201 for successful creation
      
      console.log(response.body);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User created');
    });
  
    test('Should return 400 if missing required fields.', async () => {
      const invalidUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        // Missing password
      };
      const response = await request(app)
        .post('/sign-up')
        .send(invalidUser)
        .expect('Content-Type', /json/)
        .expect(400);
      
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