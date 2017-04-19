# ticker

[![Build Status](https://travis-ci.org/neoroma/btcTicker.svg?branch=master)](https://travis-ci.org/neoroma/btcTicker)

`npm i` and all that

## To try

run 
`npm start`

open 
```http://localhost:3000/```
in chrome so that es2015 FrontEnd code (there is not much) could feel good
The js code is placed right into the `public/index.html` not to be complicated, 
there are a few subs to socket events to update the dom with 10 or less latest results

This will connect to a **socket** and subscribe for some events, or event get some cached values from the server.
Try also to open more tabs with the same url to have synced fresh data in all of them

Request to all feeds (described in code here `/feeds/**`) will shared for all subscribers and only if there is a subscriber.
Without any server will wait doing nothing. 

Feeds will be requested and some result will be chosen. The logic is described in 
code here : `feeds/util.js:packageTheResult` which is a simple composition of steps to produce end result.

## About the code

![alt tag](https://avatars1.githubusercontent.com/u/6407041?v=3&s=200)

Using **rxjs** heavily to handle all sort of events in the system. 
Rx (ReactiveX) approach is perfect for having the same style of coding both on FE and BE.

![alt tag](http://ramda.jcphillipps.com/logo/ramdaFilled_200x235.png)

Using **ramda** heavily to make the code look declarative and work in a functional fashion. 
Small pure functions are building block to compose more complex applications. 

