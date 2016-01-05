# generator-expresso [![build-status](https://travis-ci.org/hellobrian/generator-expresso.svg?branch=master)](https://travis-ci.org/hellobrian/generator-expresso)

> [Yeoman](http://yeoman.io) generator


## Getting Started

```bash
npm install -g yo
```

To install generator-expresso from npm, run:

```bash
npm install -g generator-expresso
```

Finally, initiate the generator:

```bash
yo expresso
```

## Features

- gulp
- gulp-sass
- gulp-autoprefixer
- browser-sync (live-reload)
- express

# Usage

In development: 

```bash
npm run dev
```

- runs express web server with nodemon, watches for changes on javascript files and restarts server.
- browser-sync will proxy express web server and open http://localhost:3001 (or next available port)
- browser-sync will live-reload CSS on save/change to scss files
- gulp-sass will compile scss files to css files.
- gulp-autoprefixer will add vendor prefixes to css. 
- gulp will watch for changes on scss files. 

In production: 

```bash
npm start
```
- Builds scss before starting web server.
- Include this in `manifest.yml` file when deploying to a PaaS, like Bluemix or Heroku. 

## License

MIT
