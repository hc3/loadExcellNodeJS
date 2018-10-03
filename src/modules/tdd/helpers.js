import supertest from 'supertest';
import chai from 'chai';
import app from '../../../index';

global.Server = supertest(app.listener);
global.expect = chai.expect;