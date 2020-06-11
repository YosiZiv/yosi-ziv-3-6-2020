# herolo weather app
react web app for search and save cities weathers conditions
# Project Title

Project Home Assigment for Twillo  

## Getting Started

  cd client &&
  npm install
  npm start

### Prerequisites
no need any presetup requierd the api_key all ready include
### App dependencies
Frontend: 
Create React App boundle Axios(Http request) 
redux(state managment) react-redux(connection store to react)
bootstrap(ui)

### Work Flow: 
after reading cerfully the assigment request i start to plan a full cache strategy.
since their is no server on this simple web app i couldnt make global cache system with redis or etc, i use browser localstorage for per user local-storage on browser. its still very useful to load off request from api and fast result on cache match.

### Techologies architecture
Web application writting in html css3 javascript with React framework

### WORK CONCLUSIONS:
the must diffuclt part on the application planing is to keep redux state in current state on user browser localstroage cache json.
its took me quiet a few hours to make this cache system work, now you can test the application as make as you like as long as you make sure to hit the cache(just use the same letters for searching well work fine)
app init
1. pick up date from localstorage and update redux state for use cache.
2. ask for user location if non giveing show tel-aviv by default, if user give location show is location 
### Todo
1. improve application style and ui.
2. handle api request error  
3. remove favorites from favories page ( now remove favoreits only from weather page)
4. keep improve application code readble and simplity

enjoy
