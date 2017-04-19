# ticker

`npm i` and all that

## To try

run 
`npm start`

open 
```http://localhost:3000/```
in chrome so that es2015 FrontEnd code (there is not much) could feel good

This will connect to a **socket** and subscribe for some events, or event get some cached values from the server.
Try also to open more tabs with the same url to have synced fresh data in all of them

Request to all feeds (described in code here `/feeds/**`) will shared for all subscribers and only if there is a subscriber.
Without any server will wait doing nothing. 

Feeds will be requested and some result will be chosen. The logic is described in 
code here : `feeds/util.js:packageTheResult` which is a simple composition of steps to produce end result.
