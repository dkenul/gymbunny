# GymBunny - Workout Tracker

This project is mostly an excuse to play around with Scala and try a frontend framework (Mithril) for the first time.
Bonus points if it actually ends up being useful :joy:


### Requirements:

* [Java SDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [SBT](http://www.scala-sbt.org/download.html)
* [Node (just npm)](https://nodejs.org/en/download/)

### Installation:

#### frontend:
```
cd frontend
npm i
npm start
```

#### backend:

basic (with compile on save)
```
sbt ~run
```

with access to H2
```
sbt console
h2-browser
sbt ~run
```

### TODOs

Intended Features:
* Progress tracking / graphing
* more data!
* user auth

Improvements:
* UI / visual improvement - current is bare bones
* Better (perhaps non DIY) state mgmt on the front end
* Abstract common scala service and controller behavior - lots of repetition there

### Thoughts on Mithril

TBD
