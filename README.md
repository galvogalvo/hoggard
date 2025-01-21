# Hoggard: Static Site Generator
A very, very, very simple static site generator. 

## Install
Yarn: `yarn add --dev https://github.com/galvogalvo/hoggard`
NPM: `npm install --save-dev https://github.com/galvogalvo/hoggard`

Add or update the build step in `pakacge.json` for your site. It should looks something like this:
```
  {
  "name": "gourmetski-chef",
  "version": "1.0.0",
  "scripts": {
    "build": "yarn run hoggard",
    "dev": "netlify dev"
  },
  "devDependencies": {
    "@galvogalvo/hoggard": "https://github.com/galvogalvo/hoggard#v0.1-alpha"
  }
}
```

To build use `yarn run build` or `npm run build`.

## Structure
Requires the following structure:
`_components` <---- A directory containing any components you wish to refernce (eg. `footer.html`);
`_pages` <---- HTML pages that can contain references to components (see theming below)
`build` <---- Destination folder, this should contain any _images_, _css_, _js_ or any other static assets

## Templates
To include a component in a page add a comment with the structure `<!--### <component name> ###-->` where `component name` is the name of a file in the `_components` folder. 

eg. 

`<!--### footer ###-->` which relates to `\_components\footer.html`

## Running locally

## Deploying to Netflify

## About Hoggard
This name of this repo is inspired by the batting of [Matthew Hoggard](https://en.wikipedia.org/wiki/Matthew_Hoggard)

> Hoggard also had a sound defensive batting technique, but was not known for scoring runs, averaging only 7.40 with the bat. He could block up an end for the batsman at the other end to score, and was also used as a nightwatchman.
