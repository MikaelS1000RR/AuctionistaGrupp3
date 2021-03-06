# Auctionista API-documentation

### This is how you start using Auctionista API :
### **Endpoitns for Product** 

### api/products

contains: list of products

#### method : **GET**
#### response :  
 ``` JSON {
        "id": 19,
        "brand": "Tesla",
        "title": "Tesla S",
        "description": "Electric car",
        "startingPrice": 800000.0,
        "uploadDate": "09/04/2021",
        "endDate": "10/05/2021",
        "details": "550 HP",
        "condition": "New",
        "imageUrl": "/uploads/4I-hwPFf7UN8GFGgD0tTv.jpeg,/uploads/dQE5KqElaMHsjjl-VKLtl.jpeg,"
        "locationId": {
            "id": 8,
            "name": "Lund"
        },
        "productOwnerId": {
            "id": 16,
            "username": "Elon",
            "email": "elon.musk@tesla.com"
        },
        "bids": [
            {
                "id": 62,
                "bidderId": {
                    "id": 37,
                    "username": "BobTheBidder",
                    "email": "bob@gmail.com"
                },
                "price": 800000.0,
                "bidderTime": "2021-11-04T09:05:37.213+00:00"
            },
        ],
        "categoryId": {
            "id": 4,
            "name": "Vehicles"
        }
    }, 
     
```
#

### api/products/{id}

contains: specific product
#### method : **GET**
### response:
### Look at previous example. Response is the same but it has only one specific product that you find by id. 
#
### /api/products/queries?title={name}&locationId={id}&categoryId={id}
contains: specific product based on search
### method: **GET**
### response: Look at the first example. Response is the same but it shows products based on search. 
#
### 

### **Endpoitns for User** 
### /rest/users
contains : list of users, their bids and products
#### method : **GET**
### response:
```JSON {
    "id": 122,
    "products": [
        {
            "id": 123,
            "brand": "Mercedes-Benz AMG ",
            "title": "Mercedes",
            "description": "A BRAND NEW Mercedes-Benz AMG !",
            "startingPrice": 10000.0,
            "uploadDate": "2021-11-12",
            "endDate": "1637971200000",
            "details": "699 HP",
            "condition": "Good!",
            "imageUrl": "/uploads/xjJV4pPvQr4yzIZKu5Gj6.jpeg,",
            "locationId": {
                "id": 8,
                "name": "Lund"
            },
            "categoryId": {
                "id": 4,
                "name": "Vehicles"
            }
        }
    ],
    "username": "Elon Musk",
    "email": "elon.musk@tesla.com",
    "bids": [
        {
            "id": 124,
            "productId": {
                "id": 36,
                "brand": "Volvo",
                "title": "Volvo",
                "description": "It works very well",
                "startingPrice": 570000.0,
                "uploadDate": "09/04/2021",
                "endDate": "1736100883029",
                "details": "none",
                "condition": "Ny",
                "imageUrl": null,
                "locationId": {
                    "id": 3,
                    "name": "Malm??"
                },
                "categoryId": {
                    "id": 4,
                    "name": "Vehicles"
                }
            },
            "price": 689700.0,
            "bidderTime": "2021-11-12T13:48:00.718+00:00"
        }
    ]
}
```
### **Endpoitns for User** 
### /rest/users/{id}
contains : specific user
#### method : **GET**
### response:
### Look at previous example. Response is the same but it has only one specific user that you find by id. 
#
### **Endpoitns for Category** 
### /rest/categories
contains : list of categories
#### method : **GET**
### response:
```JSON {
    {
        "id": 1,
        "products": [],
        "name": "Bicycle"
    },
    {
        "id": 2,
        "products": [],
        "name": "Tech"
    },
    {
        "id": 3,
        "products": [],
        "name": "Clothing"
    },
     {
        "id": 4,
        "products": [],
        "name": "Vehicles"
    },
     {
        "id": 5,
        "products": [],
        "name": "Kitchen"
    },
     {
        "id": 6,
        "products": [],
        "name": "Home"
    }, 
     {
        "id": 7,
        "products": [],
        "name": "Tools"
    },
    {
        "id": 8,
        "products": [],
        "name": "Litterature"
    }
```
### /rest/categories/{/id}
contains : specific category
#### method : **GET**
### response: it has only one specific category that you find by id. 
```JSON {
{
    "id": 1,
    "products": [],
    "name": "Bicycle"
}
```
#
### **Endpoitns for whoami** 
### /api/whoami
contains : specific user
#### method : **GET**
### response:

#
### **Endpoitns for Bid** 
### /rest/bids
contains : list of bids
#### method : **GET**
```JSON {
       {
    "id": 23,
    "bidderId": {
        "id": 16,
        "username": "Bob Rock",
        "email": "bob.rock@gmail.com"
    },
    "productId": {
        "id": 22,
        "brand": "Volvo",
        "title": "Volvo v90",
        "description": "It works very well",
        "startingPrice": 500000.0,
        "uploadDate": "09/04/2021",
        "endDate": "10/05/2021",
        "details": "DIESEL",
        "condition": "Ny",
        "imageUrl": "/uploads/,PGkrsg5pJkd23YeAptWAx.jpeg",
        "locationId": {
            "id": 8,
            "name": "Lund"
        },
        "categoryId": {
            "id": 4,
            "name": "Vehicles"
        }
    },
    "price": 510000.0,
    "bidderTime": "2021-09-04T00:00:00.000+00:00"
}
```
#
### /rest/bids/{id}
contains : specific bid
#### method : **GET**
### Look at previous example. Response is the same but it has only one specific bid that you find by id. 
#
## **Endpoitns for Location** 
### /rest/locations
contains : list of locations
#### method : **GET**
### response: 
```JSON {
    {

    "id": 0,
    "products": [],
    "name": "Lund"
    
    },

     {

    "id": 0,
    "products": [],
    "name": "Malm??"
    
    }, 

     {

    "id": 0,
    "products": [],
    "name": "Helsingborg"
    
    } 
```
#

### /rest/locations/{/id}
contains : specific location
#### method : **GET**
### response:  Response is the same but it has only one specific location that you find by id. 
```JSON {

   {

    "id": 0,
    "products": [],
    "name": "Lund"
    
    } 

```
#

### /api/products/createProduct
contains: attributes for a product 
#### method: **POST**
request: 
```JSON
{
    "title": "Brand new Volvo",
    "brand": "Volvo",
    "details": "Brand new, not used",
    "categoryId": 4,
    "startingPrice": 320000,
    "endDate": "09/04/2021",
    "condition": "New",
    "locationId": 3,
    "description": "Never used this car",
    "uploadDate":"10/10/2021",
    "productOwnerId": 16,
    "imageUrl": "lorem.jpg"
}
```

#
### /rest/locations
contains: attributes for a location
#### method: **POST**
request:
```JSON
{
    "id": 1,
    "name": "Malm??"
}
```
#
### /rest/categories
contains: attributes for a category
#### method: **POST**
request:
```JSON
{
    "id": 4,
    "name": "Vehicles"
}
```

#
### /rest/users
contains: attributes for an user
#### method: **POST**
request:
```JSON
{
    "username": "John Johnson",
    "password": "John123",
    "email": "john@mail.com"
}
```
#
### /rest/bids
contains: attributes for a bid
#### method: **POST**
request: 
```JSON
{
    "bidderTime": 1630713600000,
    "price": 510000,
    "bidderId": 16,
    "productId": 22 
}
```