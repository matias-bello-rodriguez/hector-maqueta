# Backend for Hector Maqueta

This is the Express backend for the Hector Maqueta application, connected to Firebase Firestore.

## Setup

1.  **Install Dependencies:**
    Navigate to the `backend` directory and run:
    ```bash
    npm install
    ```

2.  **Firebase Configuration:**
    -   Go to the [Firebase Console](https://console.firebase.google.com/).
    -   Create a new project or select an existing one.
    -   Go to **Project Settings** > **Service accounts**.
    -   Click **Generate new private key**.
    -   Save the JSON file as `serviceAccountKey.json` inside the `backend/config/` directory.
    -   **Important:** Ensure `backend/config/serviceAccountKey.json` is in your `.gitignore` if you are using git, to avoid committing secrets.

3.  **Environment Variables:**
    -   Check the `.env` file. The default port is 3000.

## Running the Server

-   **Development Mode:**
    ```bash
    npm run dev
    ```
-   **Production Mode:**
    ```bash
    npm start
    ```

## API Endpoints

-   **Clientes:** `/api/clientes` (GET, POST, PUT, DELETE)
-   **Cotizaciones:** `/api/cotizaciones` (GET, POST, PUT, DELETE)
-   **Ventas:** `/api/ventas` (GET, POST, GET :id)
