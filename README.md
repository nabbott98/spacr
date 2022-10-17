# SPACR
Full stack application using NASA API to pull space images and display them with additional user functionality

## Overview
SPACR is a full stack application showing images from NASA's [Astronomy Picture of the Day API](https://apod.nasa.gov/apod/astropix.html) https://api.nasa.gov/planetary/apod?api_key=NKq9cgpepLxEaEBsOSr9zXghCayrcpqkIdOjBVK3 and  as a stretch goal Earth Images 
[NASA Open API](https://api.nasa.gov/)
Users will see 20 pictures on the index screen to start and any additional images that they or other users have added by using the app

## Approach
I was inspired to create an application based around a NASA API given my entusiasm for space and astronomy. I found that NASA had an api that has an astronomy picture of the day and decided I wanted to make an app based around that. First I setup a working backend API using mongodb, mongoose, express, and axios. I then went an built the front end using liquidjs and bootstrap. 

## Technologies used
MongoDB - NoSQL Database
Mongoose - Object modeling for mongodb
Express - Route controller
Liquid - View templating Engine
Bootstrap - Styling framework
HTML
CSS
JS

## Technical Requirements
Models
  - User
  - Daily picture IMG
    - Comment

Incorporated API's
- NASA APOD API

## User Stories
As a user, I want the ability to... 
  - sign up.
  - sign in. 
  - change my password. 
  - sign out. 
  - view NASA Astronomy Picture of the Day images. 
  - view all of my added images
  - view all individual added images. 
  - unadd images. 
  - view images others have added to the database. 

## Wireframes / Screenshots
![SPACR Wireframe](/planning/SPACR-wireframe.png)
## Entity Relationship Diagrams
![SPACR ERD](/planning/ERD.png)

## RESTFUL Routes for personal db
| Route Name | URL | HTTP Verb | Description |
| ----------- | ----------- | ----------- | ----------- |
| INDEX | /apods | GET | Display a list of all astronomy pictures |
| USER INDEX | /apods/mine | GET | Display a list of all astronomy pictures |
| SHOW | /apods/:id | GET | Display specific astronomy picture |
| CREATE | /apods | POST | Create new astronomy picture then reroute |
| UPDATE | /apods/:id | PUT | Update apod |
| DESTROY | /apods/:id | DELETE | Delete astronomy picture then reroute |

## RESTFUL Routes for accessing NASA APOD API
| Route Name | URL | HTTP Verb | Description |
| ----------- | ----------- | ----------- | ----------- |
| INDEX | /apods/random | GET | Returns a random APOD |
| INDEX | /apods/today | GET | Returns todays APOD |
| INDEX | /apods/date/:date | GET | Returns APOD from specified date (:date format: YYYY-MM-DD) |


## Weekly Schedule
Monday: Build out database models, play around with NASA api to get more comfortable
Tuesday: Finish backend API
Wednesday: Start building out Views 
Thursday: Views
Friday: Views and bug fixing 

return number of likes as a virtual