import express from 'express';
import cookieParser from 'cookie-parser';
// import curl from 'node-libcurl';
import React from 'react';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';

import routes from './routes';
import serverContent from './serverContent';
import { NotFound, ServerError, Loading } from './ssrComponents';
import config from './config';

const app = express();
app.use(cookieParser());
app.use(express.static('./public'));

const safeStringify = (obj) => {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
};
const renderPage = (appHtml, title, initialState) => {
  const appState = safeStringify(initialState);
  return `
    <!DOCTYPE html>
    <html lang="ja">
      <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
      <meta name="format-detection" content="telephone=no" />
      <meta charset="UTF-8" />
      <title>${title}</title>
      <link rel="stylesheet" href="/assets/css/style.css" type="text/css" media="all" />
      <link rel="shortcut icon" href="/assets/img/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" href="/assets/img/apple-touch-icon-precomposed.png" />
    </head>
    <body>
      <div id=app>${appHtml}</div>
      <script>
        var APP_STATE = ${appState};
      </script>
      <script src="/bundle.js"></script>
    </body>
    <html>
   `;
};

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    if (renderProps) {
      const token = req.cookies.token;
      const fetchInfo = serverContent(renderProps, token);
      const title = `${config.siteTitle}`;
      const appHtml = renderToString(<Loading />);
      res.status(200).send(renderPage(appHtml, title, fetchInfo.initialState));
    } else if (err) {
      const title = `500 INTERNAL SERVER ERRPR | ${config.siteTitle}`;
      const appHtml = renderToString(<ServerError />);
      res.status(500).send(renderPage(appHtml, title));
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else {
      const title = `404 NOT FOUND | ${config.siteTitle}`;
      const appHtml = renderToString(<NotFound />);
      res.status(404).send(renderPage(appHtml, title));
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
