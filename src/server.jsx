import express from 'express';
import cookieParser from 'cookie-parser';
// import curl from 'node-libcurl';
import React from 'react';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

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
const renderPage = (appHtml, head, initialState) => {
  const appState = safeStringify(initialState);
  console.log('head.meta.toString()');
  return `
    <!DOCTYPE html>
    <html lang="ja">
      <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
      <meta name="format-detection" content="telephone=no" />
      <meta charset="UTF-8" />
      ${head.title.toString()}
      ${head.meta.toString()}
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
    const head = Helmet.renderStatic();
    if (renderProps) {
      (async () => {
        try {
          const token = req.cookies.token;
          const fetchInfo = await serverContent(renderProps, token);
          const appHtml = renderToString(<Loading title={fetchInfo.title} />);
          res.status(200).send(renderPage(appHtml, head, fetchInfo.initialState));
        } catch (e) {
          console.log(e);
          const title = `500 INTERNAL SERVER ERRPR | ${config.siteTitle}`;
          const appHtml = renderToString(<ServerError />);
          res.status(500).send(renderPage(appHtml, head, title));
        }
      })();
    } else if (err) {
      const title = `500 INTERNAL SERVER ERRPR | ${config.siteTitle}`;
      const appHtml = renderToString(<ServerError />);
      res.status(500).send(renderPage(appHtml, head, title));
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else {
      const title = `404 NOT FOUND | ${config.siteTitle}`;
      const appHtml = renderToString(<NotFound />);
      res.status(404).send(renderPage(appHtml, head, title));
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
