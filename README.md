<img src="https://media.giphy.com/media/3o6Zt6wCXPJNlJGgh2/giphy.gif" width="100%" />

# OOMG

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Prefetch

Generate questions JSON using [this document](https://docs.google.com/spreadsheets/d/1jlSotIkfLHD6TK_bR9uCxHp3_X_6p2rngYYeJYJ_E98/edit) by running `make questions`.

## Export answers

Export the full production database by running `make export` (you must be authorized to access this app on Heroku).
