## Install MySql 
https://www.mysql.com/
First of all, install Mysql, log in, and create a database.
To fill the database with test data, you can perform one of
the backups (of the first or second version)

P.S if you launch script second version you must aslso 
change version in db-version.json to v2
If you want empty tables you can run **sql/v1/create-books-table.sql**.
And use npm **migrate_up** asfter if you need second version


## How to launch
1. Clone the repository: `git clone https://github.com/pavelkortp/library`
2. Go to the project folder: `cd library`
3. Set up dependencies: `npm install`
4. Input your db login, pass and db name in db-config.ts
5. Start the project: `npm run bs`

## How to use
By default app works on port 3000
You can change it in app.ts

## **front routes**:
* **localhost:3000/** - main page with books
* **localhost:3000/books/id** - personal book page
* **localhost:3000/search** - result search page 
* **localhost:3000/admin** - admin panel
* **localhost:3000/img/books/id** - personal book image

## **api routes**
**GET localhost:3000/api/v1/books** - by default returns a list of books,
also can take a query params
1) offset - pagination offset
2) limit - combining with offset, limit of books count on start
3) author - filter books by author_id
4) year - filter books by release year
5) filter - sort books by date (new), by views (popular) or by id (all)

**GET localhost:3000/api/v1/books/id** - return book with current id
**PATCH localhost:3000/api/v1/books/id** - update clicks count by button for current books
take a querry param **increase_clicks=true**

## **Admin api routes**
1) **GET localhost:3000/admin/api/v1/books** - by default returns a list of books,
2) **DELETE localhost:3000/admin/api/v1/books/id** - gently deletes the book (the book is 
marked in the database as completed and remains on the site for some time until CRON 
is triggered, more information about this can be found in cron.ts)
3) **POST localhost:3000/admin/api/v1/books** - creates new book

## **FRONT**
All frontend(js and css) stored in **static** folder, ejs templates in **views**
