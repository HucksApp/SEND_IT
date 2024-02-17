# SEND_IT 🚛

## Description
SEND_IT is a Fullstack project Exercise by Andela

SEND_IT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories


## Repository Structure 🔗

Branch                  |     Description
------------------------|---------------------
master branch           | Project Descriptions
s-i-react branch        | SendiT frontend with react.js
front-vanila            | SendiT frontend with HTML5/CSS3, Vanila Javascript    
back-api                | SendiT backend with Nodejs -> Express.js, PostgreSQL, google api -> item location map



⚠️🚼 structure folders, files, functions listed are only those of Note ‼️

## s-i-react Branch   


### Folder structure

/SEND_IT/src

Folder           |    File, Content and Description
-----------------|------------------------------
/components      | All jsx UI component
/controls        | Geocode.js: Handler for convertion between physical address and long & lat 
➞                 | formControl.js: form Data control
/img             | Images used in UI
/notifications   | Toastr.js: Notification configuration
/styles          | Css3 files


File             |     Content and Description
-----------------|-----------------------------
App.js           | Root React component where the Router sits
App.css          | setting Default app css
index.css        | setting Default app css




## front-vanila Branch

### Folder structure

Folder           |    File, Content and Description
-----------------|------------------------------
/handlers        | account.js: handlers and listeners for account related operation such as 
➞                | authentication and authorization, ...
➞                | admin.js: handlers and listeners for administration related operations such as 
➞                | fetching all in store pakages information and changing them.
➞                | Create.js: Creating and struture UI components
➞                | index.js: index toggle  handler
➞                | order.js: handlers, listeners and UI components creation for goods order related operation
➞                | signin.js: Listener for switching between Admin or User loging form
/updateHandlers  | acount_update.js: Handler for account information update 
➞                | admin_update.js: Handler for admin  update operations for all goods and accounts
➞                | order_update.js: Handler for user orders update operations, for all goods 
➞                | signin_update.js: Handler for user signin and Admin signin 
➞                | signup_update.js: Handler for user signin and Admin signup 
/imges           | Images used in UI
/notifications   | Toastr.js: Notification configuration
/styles          | Css3 files



File             |     Content and Description
-----------------|-----------------------------
admin.html       | Admin html page
home.html        | user Home html page
index.html       | index html page
map.html         | goods map location page

**Note** 📌 All html pages functions as name 


## back-api


Folder           |    File, Content and Description
-----------------|------------------------------
/config          | auth/auth.js: requests Authorization, Authentication
➞                | header.js: request configuration Header
/db              | createSQL.js: User and order table constructor function
/router          | adminRoute.js: Admin routes
➞                | index.js: Router index 
➞                | orderRoute.js: User Order routes
➞                | userRoute.js: User account routes 

File             |     Content and Description
-----------------|-----------------------------
App.js           | app root
.env             | set hidden enviroment variables
index.css        | setting Default app css

# USAGE

 * front-vanila Branch (https://github.com/HucksApp/SEND_IT/tree/front-vanila)

 * s-i-react (https://github.com/HucksApp/SEND_IT/tree/s-i-react)

 * back-api (https://github.com/HucksApp/SEND_IT/tree/back-api)





