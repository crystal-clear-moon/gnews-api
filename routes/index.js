const express = require('express');
const router = express.Router();
const ArticleController = require('../controller/article.controller');

router.get('/articles', ArticleController.index);
