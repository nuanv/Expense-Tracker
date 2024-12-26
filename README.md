## ExpenseTracker - Getting Started

1. Clone the repository from GitHub:

   ```sh
   git clone https://github.com/niharPat/Expense-Tracker.git
   ```

2. To Install the necessary dependencies navigate to backend and frontend directories and run:

   ```sh
   npm install
   ```

4. Define your MONGO_URL in /backend/.env:

   ```env
   MONGO_URL= <your mongodb url>
   ```

5. Start the backend and frontend:

   ```sh
   /backend > npm start
   /frontend > npm run dev
   ```

## Running Docker Containers

### Representation
```sql
              +---------------------+
              |  frontend Container |
              |---------------------|
              |  Runs Vite on port  |
              |  3000 inside the    |
              |  container          |
              |---------------------|
              |  Connects to        |
              |  backend:8000       |
              |  via app-network    |
              +---------------------+
                         |
           Communicates over `app-network`
                         v
              +---------------------+
              |  backend Container  |
              |---------------------|
              |  Runs Express.js on |
              |  port 8000 inside   |
              |  the container      |
              |---------------------|
              |  Connects to        |
              |  MongoDB via        |
              |  MONGO_URL (network)|
              +---------------------+
                        |
          Communicates over `app-network`
                        v
              +---------------------+
              |    MongoDB Server   |
              |  (External service) |
              |---------------------|
              |  Accessed using     |
              |  a connection URL   |
              +---------------------+

```

### Start Docker Engine

1. In docker-compose.yml provide the MONGO_URL

   ```yml
       environment:
         - MONGO_URL=
   ```

2. Run docker compose

   ```sh
   docker compose up --build
   ```

### Notes
- **`frontend` container**:
  - Built from `frontend/Dockerfile`.
  - Port `3000` inside the container maps to `localhost:3000` on the host.
  - Depends on the `backend` service.

- **`backend` container**:
  - Built from `backend/Dockerfile`.
  - Port `8000` inside the container maps to `localhost:8000` on the host.
  - CORS configured to allow `frontend` service communication.

- Both containers use `app-network` for internal communication (via service names like `backend` or `frontend`).

- MongoDB is external (could also be another container if specified). Accessed via `MONGO_URL` defined in the environment.
