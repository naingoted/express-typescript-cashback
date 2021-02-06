## Assumptions and App Logics

- There need to be a column `redemption` on ruleset table to track how many redemption has been made
- Transaction won't be recorded if it doesn't meet the requirement
- Each Transaction will check if it's eligible for cashback before inserted with calculated cashback amount
- Requesting cashback api will return records with cashback value higher than 0 from Transaction table

## To Get Started

- set up mysql db
- copy .env.example to .env file
- set proper credentials under #Database comments in .env file
- npm install && npm run dev will sync database tables
  
## Api Routes

- http://localhost:8000/api/ruleset
- http://localhost:8000/api/transaction
- http://localhost:8000/api/cashback