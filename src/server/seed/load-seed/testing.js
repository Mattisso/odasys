// getting-started.js
//var mongoose = require('mongoose');
'use strict';
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

// require('../../config/ohadb').connectserver();

require('../../config/ohadb').connectserver();


var async = require('async');
var _ = require('lodash');
/*
var path = require('path');
var Models = require('../../omodels/index.js');
var oreferenceLoad = require('./oreference-seed');
var compteLoad = require('./ocompte-seed');
var userLoad = require('./user-seed');
var ostbleareaLoad = require('./ostblarea-seed');
var ostableauposteLoad = require('./ostableauposte-seed');
 var oleveLoad = require('./olevel-seed');
var otableauposteLoad = require('./otableauposte-seed');
var oexerccomptaLoad = require('./oexercompta-seed');
var oexercciceLoad = require('./oexercice-seed');
var ohadaseed = require('./ohada-seed.load');*/

const {insertoReference, seeddatas$}=require('./ocomptereferenceSeed').toinit();


insertoReference();
