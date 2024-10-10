const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

// Mock external dependencies
jest.mock('mongoose');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

// Import the app (assuming it's exported from the original file)
const app = require('./index.js');

describe('Express App Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return Hello World', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World');
    });
  });

  describe('POST /upload', () => {
    it('should upload an image and return success', async () => {
      const response = await request(app)
        .post('/upload')
        .attach('product', 'path/to/test/image.jpg');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', 1);
      expect(response.body).toHaveProperty('image_url');
    });
  });

  describe('POST /addproduct', () => {
    it('should add a new product', async () => {
      const mockProduct = {
        name: 'Test Product',
        image: 'test-image.jpg',
        category: 'Test Category',
        new_price: 99.99,
        old_price: 129.99,
      };

      mongoose.model.mockReturnValue({
        find: jest.fn().mockResolvedValue([{ id: 1 }]),
        save: jest.fn().mockResolvedValue(mockProduct),
      });

      const response = await request(app)
        .post('/addproduct')
        .send(mockProduct);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', 1);
      expect(response.body).toHaveProperty('name', mockProduct.name);
    });
  });

  describe('POST /signup', () => {
    it('should register a new user', async () => {
      const mockUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      mongoose.model.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(null),
        save: jest.fn().mockResolvedValue({ id: 'user_id' }),
      });

      bcryptjs.hash.mockResolvedValue('hashed_password');
      jwt.sign.mockReturnValue('mocked_token');

      const response = await request(app)
        .post('/signup')
        .send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
    });

    it('should return error for existing user', async () => {
      const mockUser = {
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123',
      };

      mongoose.model.mockReturnValue({
        findOne: jest.fn().mockResolvedValue(mockUser),
      });

      const response = await request(app)
        .post('/signup')
        .send(mockUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('errors', 'Existing user found with same email id');
    });
  });

  describe('POST /login', () => {
    it('should login a user with correct credentials', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'password123',
      };

      mongoose.model.mockReturnValue({
        findOne: jest.fn().mockResolvedValue({
          id: 'user_id',
          password: 'hashed_password',
        }),
      });

      bcryptjs.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mocked_token');

      const response = await request(app)
        .post('/login')
        .send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
    });

    it('should return error for incorrect password', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'wrong_password',
      };

      mongoose.model.mockReturnValue({
        findOne: jest.fn().mockResolvedValue({
          id: 'user_id',
          password: 'hashed_password',
        }),
      });

      bcryptjs.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/login')
        .send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('errors', 'Invalid password');
    });
  });


});