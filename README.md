[![Build Status](https://travis-ci.org/YasushiKobayashi/react-cms.svg?branch=master)](https://travis-ci.org/YasushiKobayashi/react-cms)
[![CircleCI](https://circleci.com/gh/YasushiKobayashi/react-cms.svg?style=svg)](https://circleci.com/gh/YasushiKobayashi/react-cms)

### api repo
https://github.com/YasushiKobayashi/go-api

### set up
```bash
yarn
cd src && cp config.sample.js config.js
// start webpack dev server
npm start

// start express ssr server(not live reload)
npm run dev
```

### test
```bash
npm run lint
npm run test
```

### install node js
```bash
brew install nodenv yarn
nodenv install 6.7.0
nodenv rehash
nodenv global 6.7.0
echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(nodenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
```

### run e2e test
```bash
brew install pyenv
echo 'export PYENV_ROOT="${HOME}/.pyenv"' >> ~/.bash_profile
echo 'export PATH="${PYENV_ROOT}/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile

npm run test:selenium
```

### directory
```
├── __tests__
├── selenium
├── public
├── src
│   ├── index.jsx
│   ├── server.jsx
│   ├── config.js
│   ├── actions
│   ├── api
│   ├── model
│   ├── reducers
│   ├── sagas
│   ├── store
│   ├── types
│   ├── components
│   ├── containers
│   ├── parts
│   ├── ssrCompornents
│   ├── utils
```
