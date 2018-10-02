# weekly-work-note
Note your work schedule and TODOs daily with this simple intuitive note
- Try on [Weekly Work Note](http://ec2-18-216-145-9.us-east-2.compute.amazonaws.com/ "Weekly Work Note")

## Skills
- NodeJS - Express with Pug
- MongoDB with Mongoose
- PassportJS (passport-local) for Auth
- Simple CSS styles

## App details
- MVC structure is used
- Get weekly dates from current date and show on each notes
- Save notes based on user and current week
- users and notes are separated database models, and user id is stored in each note docs so correct notes can be retrieved by user id
- Show an effect on save button when notes are saved successfully
- Change date from Histroy and read/update notes from past and future
- Change font and wall from the list of predefined walls and fonts
- Save note every one minute automatically


## Notes
- ES6 Arrow function doesn't work with jQuery event
- Build everything without ajax and change to ajax at the end, because router logic and other server side logic doesn't need to be changed at all whether data is from form submitting or from ajax request.
- Database structure changed in the middle of development in order to implement search feature 
(prev : one record has one week / now : one record has one day)
