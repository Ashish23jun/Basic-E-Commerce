# E-Commerce API

This is a backend API for an e-commerce platform that supports user registration, login, product management, and order management with JWT authentication, cron jobs for notifications, and proper error handling.

*API, JWT, Authentication, Product Management, Order Management, Cron Jobs, Nodemailer.*

## Table of Contents 📃
- [E-Commerce API](#e-commerce-api)
- [Starting 🚀](#starting-)
- [Pre-requirements 📋](#pre-requirements-)
- [Installation 🔧](#installation-)
- [Server setup](#server-setup)
- [Client setup](#client-setup)
- [API Endpoints 📡](#api-endpoints-)
- [User Registration and Login](#user-registration-and-login)
- [Product Management](#product-management)
- [Order Management](#order-management)
- [Cron Jobs ⏰](#cron-jobs-)
- [Built with 🛠️](#built-with-️)

## Starting 🚀

### Pre-requirements 📋
Before starting, make sure you have the following installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### Installation 🔧

#### Local Installation:
1. **Clone this repository**
```bash
git clone https://github.com/your-repository/e-commerce-api.git
```

2. **Navigate to the project directory**
```bash
cd e-commerce-api
```

### Server Setup:

1. **Install dependencies**
```bash
npm install
```

2. **Create a .env file**
Copy the example environment file and modify it with your credentials.
```bash
cp .env.example .env
```

3. **Update .env file with your credentials:**
```shell
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/e-commerce

# JWT Configuration
JWT_SECRET=your-secret-key-here

# Email Configuration (for nodemailer)
EMAIL_FROM=your-email@example.com
ADMIN_EMAIL=admin@example.com
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

### Client Setup:
If your project includes a client, navigate to the client folder and set it up:

```bash
cd client
npm install
cp .env.example .env.local
```

In the client's .env.local file, set the API URL:
```shell
REACT_APP_API_URL="http://localhost:3000/api"
```

## API Endpoints 📡

### User Registration and Login:

1. **Register User**
   * **Method**: `POST`
   * **URL**: `/api/auth/register`
   * **Body**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```
   * **Response**:
```json
{
    "message": "User registered successfully"
}
```

2. **Login User**
   * **Method**: `POST`
   * **URL**: `/api/auth/login`
   * **Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
   * **Response**:
```json
{
    "token": "JWT_AUTH_TOKEN"
}
```

### Product Management:

1. **Create Product**
   * **Method**: `POST`
   * **URL**: `/api/products`
   * **Body**:
```json
{
    "name": "Product Name",
    "description": "Product description",
    "price": 20.5,
    "stock": 100
}
```
   * **Response**:
```json
{
    "message": "Product created successfully"
}
```

2. **Update Product**
   * **Method**: `PUT`
   * **URL**: `/api/products/:id`
   * **Body**:
```json
{
    "price": 25.0,
    "stock": 50
}
```
   * **Response**:
```json
{
    "message": "Product updated successfully"
}
```

3. **Get All Products**
   * **Method**: `GET`
   * **URL**: `/api/products`
   * **Query Params**: `?page=1&limit=10&minPrice=10&maxPrice=100&search=product`
   * **Response**:
```json
{
    "products": [
        {
            "name": "Product Name",
            "description": "Product description",
            "price": 20.5,
            "stock": 100
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5
    }
}
```

4. **Delete Product**
   * **Method**: `DELETE`
   * **URL**: `/api/products/:id`
   * **Response**:
```json
{
    "message": "Product soft-deleted successfully"
}
```

### Order Management:

1. **Create Order**
   * **Method**: `POST`
   * **URL**: `/api/orders`
   * **Body**:
```json
{
    "user": "userId",
    "products": [
        {
            "productId": "productId",
            "quantity": 2
        }
    ]
}
```
   * **Response**:
```json
{
    "message": "Order created successfully"
}
```

2. **Get All Orders for a User**
   * **Method**: `GET`
   * **URL**: `/api/orders/user/:userId`
   * **Response**:
```json
{
    "orders": [
        {
            "orderId": "12345",
            "status": "Pending",
            "totalPrice": 50.0
        }
    ]
}
```

3. **Update Order Status**
   * **Method**: `PUT`
   * **URL**: `/api/orders/:id`
   * **Body**:
```json
{
    "status": "Shipped"
}
```
   * **Response**:
```json
{
    "message": "Order status updated"
}
```

4. **Delete Order**
   * **Method**: `DELETE`
   * **URL**: `/api/orders/:id`
   * **Response**:
```json
{
    "message": "Order deleted successfully"
}
```

## Cron Jobs ⏰

1. Product Stock Monitoring Cron:
* **Frequency**: Runs daily at midnight
* **Functionality**: Notifies the admin if a product's stock falls below 10
* **Example**: Email notification sent using Nodemailer

2. Order Fulfillment Reminder Cron:
* **Frequency**: Runs every hour
* **Functionality**: Sends email reminders for pending orders older than 24 hours

## Built with 🛠️
* **Node.js** - JavaScript runtime environment
* **Express.js** - Backend framework
* **MongoDB** - NoSQL database
* **Mongoose** - MongoDB object modeling
* **Nodemailer** - For sending emails
* **JWT** - For authentication
* **Cron** - For scheduling tasks
* **Joi** - For validation
