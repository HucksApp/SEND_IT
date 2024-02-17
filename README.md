## Description
SendiT backend with Nodejs -> Express.js, PostgreSQL, google apis


## Folder structure
refer to (https://github.com/HucksApp/SEND_IT)

## Usage
* https 
  ```
  $ git clone --single-branch --branch back-api https://github.com/HucksApp/SEND_IT.git
  ```
* ssh
  ```
  $ git clone -b back-api git@github.com:HucksApp/SEND_IT.git
  ```
run the api
 ```
 $ npm install
 $ npm start
```
starts a server on local host
url: <host_url>/api/v1/<routes>

## Routes

### Administrative Routes

router/adminRoutes.js
routes             |   request type          |       description
-------------------|-------------------------|-----------------------
/update_status     | PUT                     | Admin update orders status information
/admin_orders      | GET                     | Admin view all orders and details
/update_location   | PUT                     | Admin update current location order is at
/admin             | POST                    | Admin authentication and authorization


### Order Routes

router/orderRoutes.js
route                    |   request type       |    description
-------------------------|----------------------|-----------------------------
/order                   | GET                  | All User orders
/update_destination      | PUT                  | update order destination
/map                     | GET                  | order location query
/delete_order/:[order id]| DELETE               | delete order
/new_order               | POST                 | new order


### User Routes
router/userRoutes.js
route                    |   request type       |    description
-------------------------|----------------------|-----------------------------
/account                 | GET                  | get user account informations
/update_profile          | PUT                  | update user information
/old_user                | POST                 | Verify User and user type to grant access token for Authorization to api requests
/new_user                | POST                 | creates user and grant access token


## Index Routes
router/index.js: this files mount all the remaining routes to "/"

***example usage***

```
const uData = {
    email: johndoe@gmail.com
    password: "password"
    };
let url = "https://host_url/api/v1/old_user"

fetch(url,{ method:"POST",
            headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify(uData)
      })
        .then((res)=>{
              console.log(res);
              return res.json();
              })
        .then((data)=>{
              
              if (data.valid == false){
                  console.log(data.message)
              }else if(data.valid == true){
                  console.log(data.token);
                  console.log(data)
                }
          })
```

