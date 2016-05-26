(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This medthod is being called by page method in our routes.js file.
  // We declare a function to call next function in our route.
  // We use article.findWhere to grab the id of the particular article, whose
  // id matches the URI that we clicked on.
  // That then fires the articleData function with the article we found.
  // Then we countine on with the next function in the chain.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // In this funciton we are finding all the articles with a specific author name that matches the URI path.  That returns all the articles with the author name that we selected.  Then that is passed to the authorData funciton, which will set all the articles to our ctx object.  Finally we countine with the next function in our route.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method will find the articles based on the category that the user has clicked on.
  // We then save those articles in our ctx object.  finally contiune to the next funciton in the
  // chain.  The filter articles will be availabile to the next function.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // In this method we are checking to see if we have any articles in Article.all.
  // If we do we set those in our ctx object.  Then we call the next function in our route, which will
  // have the articles availible to it through the ctx object.  If we dont have any articles, we run fetchAll method
  // to populate Article.all with the articleDta function passed in as an argument.  The articleData function is then
  // called within the fetchAll method.  Which will eventually call our next function in our route.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
