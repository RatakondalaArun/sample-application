## Task 1: CRUD API with Validation
Duration: 45–60 minutes
### Objective
Build a REST API for a simple Notes application.

#### Requirements
1. Endpoints:
    a. `POST /notes` – Create a note
    b. `GET /notes` – List all notes
    c. `GET /notes/:id` – Fetch by ID
    d. `PUT /notes/:id` – Update note
    e. `DELETE /notes/:id` – Delete note
2. Use in-memory storage (array).
3. Add validation (e.g., title is required, minimum length 3).
4. Implement middleware for error handling and request logging.
5. Return proper HTTP status codes.



#### Implementation

- Used `expressjs` and typescript

1. Endpoints: - **Created all the routes** 
    a. `POST /notes` – Create a note
    b. `GET /notes` – List all notes
    c. `GET /notes/:id` – Fetch by ID
    d. `PUT /notes/:id` – Update note
    e. `DELETE /notes/:id` – Delete note
2. Use in-memory storage (array). **Used array for inmemory store**
3. Add validation (e.g., title is required, minimum length 3). **Added validation with joi**
4. Implement middleware for error handling and request logging. 
    **Implemented a simple middleware, we could have we cound have used morgan, winston, I choose this because of simplicity**
    **We have more robust error handling with class inheretance, but choose this because of simplicity**
5. Return proper HTTP status codes. **All the proper HTTP status are used**
    - `200` - success
    - `204` - when an iteam is deleted, we can 200 as well in some cases
    - `201` - when a note is created
    - `404` - when a note is note found
    - `400` - For validation
    - `500` - for any internal serve error


## Setup instructions

1) Install dependencies
```sh
pnpm i #used pnpm package manager
```
2) Execute script
```sh
pnpm run start
```