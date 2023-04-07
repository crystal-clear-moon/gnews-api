

const ArticleController = {
  index: (req, res) => {
    const { count, title, author, keywords } = req.params;
    const category = '?category=general';

    let url = 'https://gnews.io/api/v4/search?apikey=' + process.env.API_KEY;
    let query = '';
    let inCond = '';
    if (count) {
      url += '?max=' + Number(count)
    }
    if (title) {
      query = '"' + title + '"';
      inCond = '?in=title';
    }

    if (author) {
      query = query ? 'OR ' + author : author;
    }

    if (keywords) {
      query = query ? 'OR "' + keywords + '"' : '"' + keywords + '"';
      inCond = '?in=title,content'
    }
    console.log(url + query + inCond + category);
    fetch(url + query + inCond)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        articles = data.articles;

        return res.status(200).json({ data: articles });
      })
      .catch(err => {
        return res.status(400).json({ error: 'Oops, something is wrong' });
      });
  }
};

module.exports = ArticleController;
