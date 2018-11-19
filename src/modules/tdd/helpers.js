'use strict';

import chai from 'chai';
import app from '../../../app';
import db from '../config/db';

global.database = db;
global.Server = app;
global.expect = chai.expect;