# **Mini Notification System**

<img src="https://socialify.git.ci/sirmeeLynx/Mini-Notification-System/image?description=1&font=KoHo&issues=1&language=1&owner=1&stargazers=1&theme=Dark" alt="Mini-Notification-System" width="640" height="320" />

## Introduction
A publish-subscribe communication between two servers over a restful interface

## Pre-requisites

* Node
* MongoDB
* Redis
* Docker - Recommended

## Get Started

1. Create `.env` file and populate it taking reference to `sample.env`.
2. `docker-compose -f docker-compose.dev.yml up` 

***NOTE:*** Without docker steps  
2. `yarn install` - Install all the dependencies  
3. Check your Mongo & Redis server is up and running.  
4. `yarn start` - Start the server.  


## Design and Architecture
![Docs page 1](https://github.com/sirmeeLynx/Mini-Notification-System/blob/main/images/docs.PNG?raw=true)
![Docs page 2](https://github.com/sirmeeLynx/Mini-Notification-System/blob/main/images/docs2.PNG?raw=true)