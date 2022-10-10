# SPACR
Full stack application using NASA API to pull space images and display them with additional user functionality

## Overview
SPACR is a full stack application showing images from NASA's [Astronomy Picture of the Day API](https://apod.nasa.gov/apod/astropix.html) and Earth Images [EPIC](https://epic.gsfc.nasa.gov/)
[NASA Open API](https://api.nasa.gov/)
Users will see the 20 most recent pictures and be able to store them in the database by favoriting them

## Technologies used
MongoDB - Database
Mongoose - Object modeling for mongodb
Express - Route controller
Liquid - View templating Engine
Bootstrap - Styling engine
HTML
CSS
JS

## Technical Requirements
 Markup : - Models
              - User
              - Daily picture IMG
                  - Comment
              - EPIC IMG - potential addition
                  - Comment
          - Incorporated API's
              - NASA APOD API
              - NASA EPIC API - potential addition

## User Stories
As a user, I want the ability to... 
  - sign up.
  - sign in. 
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