[![Build Status](https://travis-ci.org/YasushiKobayashi/react-cms.svg?branch=master)](https://travis-ci.org/YasushiKobayashi/react-cms)
[![CircleCI](https://circleci.com/gh/YasushiKobayashi/react-cms.svg?style=svg)](https://circleci.com/gh/YasushiKobayashi/react-cms)

### api repo
https://github.com/YasushiKobayashi/go-api

### set update
```javascript
yarn
cd src && cp config.sample.js config.js
// start webpack dev server
npm start

// start express ssr server(not live reload)
npm run dev
```

### test
```javascript
npm run lint
npm run test
```

### when don,t have node.js
```shell
yarn install
```


### directory
```
├── assets
├── src
│   ├── index.jsx
│   ├── config.js
│   ├── actions
│   ├── components
│   ├── containers
│   ├── parts
│   ├── model
│   ├── test
│   ├── utils
```
