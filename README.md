# SPACR
Full stack application using NASA API to pull space images and display them with additional user functionality

## Overview
SPACR is a full stack application showing images from NASA's [Astronomy Picture of the Day API](https://apod.nasa.gov/apod/astropix.html) https://api.nasa.gov/planetary/apod?api_key=NKq9cgpepLxEaEBsOSr9zXghCayrcpqkIdOjBVK3 and  as a stretch goal Earth Images [EPIC](https://epic.gsfc.nasa.gov/)
[NASA Open API](https://api.nasa.gov/)
Users will see the 20 most recent pictures and be able to store them in the database by favoriting them



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
  - EPIC IMG - stretch goal
    - Comment


Incorporated API's
- NASA APOD API
- NASA EPIC API - stretch goal


## User Stories
As a user, I want the ability to... 
  - sign up.
  - sign in. https://api.nasa.gov/planetary/apod?api_key=NKq9cgpepLxEaEBsOSr9zXghCayrcpqkIdOjBVK3
  - change my password. 
  - sign out. 
  - view NASA Astronomy Picture of the Day images. 
  - "favorite" photos of the users choosing. 
  - view all of my favorite photos as cards. 
  - view all individual favorited images. 
  - unfavorite images. 
  - add older images to database through search bar.
  - view images others have added to the database. 
  - favorite images that others have added.

## Wireframes / Screenshots
![SPACR Wireframe](/planning/SPACR-wireframe.png)
## Entity Relationship Diagrams
![SPACR ERD](/planning/ERD.png)

## Weekly Schedule
Monday: Build out database models, play around with NASA api to get more comfortable
Tuesday: Finish backend API
Wednesday: Start building out Views 
Thursday: Views
Friday: Views and bug fixing 

return number of likes as a virtual