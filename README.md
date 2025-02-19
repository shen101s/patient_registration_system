# Laravel Inertia.js + React Project

This README provides step-by-step instructions to set up and run the Laravel project with Inertia.js and React.

## Prerequisites

Ensure the following software is installed on your system:

- PHP: >= 8.0
- Composer: Latest version
- Node.js: >= 14.x
- npm or yarn: Latest version
- Database: MySQL
- Web Server: Apache/Nginx

## Installation    

- Clone the Repository:
    ```
    git clone https://github.com/<your-username>/<repository-name>.git
    cd `repository-name`
    ```
    
- Install PHP Dependencies: Run the following command to install Laravel dependencies via Composer:
    ```
    composer install
    ```
    
- Install Node.js Dependencies:
    ```
    npm install
    # Or if using Yarn:
    yarn install
    ```

- Set Up Environment Variables: Copy the .env.example file to .env:
    ```
    cp .env.example .env
    ```
    Add this inside .env file
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_db_name
    DB_USERNAME=your_db_user
    DB_PASSWORD=your_db_pass
    DB_CHARSET=utf8mb4
    DB_COLLATION=utf8mb4_unicode_ci
    ```
   
- Generate Application Key:
    ```
    php artisan key:generate
    ```

- Run Database Migrations:
    ```
    php artisan key:generate
    ```
    
## Running the Application

- Start the Laravel Development Server:
    ```
    php artisan serve
    ```
    By default, the application will be accessible at http://127.0.0.1:8000.

- Start Vite (Hot Module Replacement): Run the following to enable hot-reloading for React components:
    ```
    npm run dev
    ```
    
## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
