# Xeno Shopify Insights Dashboard

Welcome to your Admin Dashboard! 🎉 This is your one-stop shop for managing orders, products, customers, and more. Whether you're a shop owner or admin, everything you need is right here, beautifully organized and easy to use.

---

## 🚀 Getting Started & Project Flow

1. **Landing & Sign In**
   - When you visit the dashboard, you'll be asked to sign in.
   - Enter your email and you'll receive a one-time password (OTP) to your inbox.
   - Enter the OTP, and you’re in! (No password hassle, just secure access.)

2. **Navigation**
   - Use the sidebar menu to jump between Orders, Products, Customers, and your Profile.
   - Each section has its own set of insights and tools, tailored for what you need.

---

## 🛠️ Local Development Setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine.

*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/get-npm)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repository.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd nextjs-admin-dashboard_deploy-once
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛡️ Authentication

- **Simple & Secure:**
  - Sign in with your email, get an OTP, and access your dashboard securely.
- **Access Control:**
  - Only authenticated users can access dashboard features—all API calls are protected.

---

## 🗺️ Main Sections & Features

### 1. **Orders**

- **Overview Cards:**
  - Get a quick look at Total Revenue, Total Products, and Total Customers.
- **Charts & Analytics:**
  - Payments Overview (visual breakdown)
  - Weekly Profit trends (choose week range)
  - Top 5 Orders by Revenue (donut chart)
  - Total Revenue Line Graph (trend over the past 3 years)
- **Region Labels:**
  - See region-based breakdowns on an interactive map.
- **Order Details Table:**
  - Paginated list of all orders
  - Sort orders by timestamp
  - Columns: Order ID, Date, Status, Quantity, Price

### 2. **Products**

- **Top Products Chart:**
  - Visualize top 5 products by inventory quantity (donut chart)
- **Top Products Table:**
  - Table of the 5 best-stocked products
  - Columns: Title, Price, Inventory, Weight
- **All Products Table:**
  - Full product list with pagination
  - Columns: Title, Price, Inventory, Weight

### 3. **Customers**

- **Top Customers Chart:**
  - Visual donut chart of top 5 customers by revenue generated
- **Top Customers Table:**
  - See the 5 highest-value customers
  - Columns: Name, Phone, Email, Revenue, Tag
- **All Customers Table:**
  - Complete customer list with pagination
  - Columns: Name, Phone, Email, Revenue, Tag

### 4. **Profile**

- **Personal Info:**
  - View and update your profile picture and cover photo
  - See shop/owner details
- **About Section:**
  - A place for your bio or shop story

---

## ⚙️ Features at a Glance

- **Beautiful, Responsive UI:**
  - Works great on desktop and mobile
- **Easy Sorting & Pagination:**
  - Sort orders by date, browse through pages of products and customers
- **All Data Live:**
  - Everything updates dynamically from your backend
- **Secure Auth:**
  - OTP-based login keeps your data safe

---

## 🙌 Final Thoughts

This dashboard is designed for real-world usability. You don’t need to be techy—just sign in and start managing! Explore each section from the sidebar and discover all the tools at your disposal.

If you have feedback or run into issues, feel free to open an issue or contribute.

Happy managing!

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in the development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the code.

## Learn More

To learn more about Next.js, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
