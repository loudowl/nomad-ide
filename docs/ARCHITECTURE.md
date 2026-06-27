# Nomad IDE Architecture Document

## 1. Tech Stack

### Frontend
- **iOS:** SwiftUI (Version 5.0)
- **Android:** Jetpack Compose (Version 1.2.0)
- **Desktop Agent:** Electron (Version 25.0)
- **Web:** CodeMirror (Version 6.0) within SwiftUI WebView

### Backend
- **Server:** Node.js (Version 18.x)
- **WebSocket Management:** Socket.io (Version 4.3)
- **Database:** PostgreSQL (Version 14)
- **In-memory Data Store:** Redis (Version 7.0)

### Hosting & Cloud Services
- **Cloud Storage:** AWS S3
- **Authentication:** AWS Cognito with JWT
- **CI/CD:** GitHub Actions

### AI Integration
- **On-device AI:** Apple Foundation Models Framework (Model: .default)
- **External APIs:** Anthropic Claude API (claude-opus-4), OpenAI GPT-Realtime-2 API
- **Image Processing:** Apple Vision API

## 2. Project Structure

```
NomadIDE/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── config/
│   ├── tests/
│   └── app.js
├── mobile/
│   ├── ios/
│   │   ├── NomadIDE/
│   │   └── Shared/
│   └── android/
│       ├── app/
│       └── shared/
├── desktop-agent/
│   └── src/
│       ├── main/
│       ├── renderer/
│       └── assets/
└── shared/
    ├── business-logic/
    └── api-clients/
```

## 3. API Design

### Endpoints

#### Authentication
- **POST /auth/login**
  - **Request:** `{ "username": "string", "password": "string" }`
  - **Response:** `{ "token": "string" }`

#### Snapshot Management
- **POST /snapshots**
  - **Request:** `{ "snapshotData": "object" }`
  - **Response:** `{ "snapshotId": "string" }`

- **GET /snapshots/{id}**
  - **Response:** `{ "snapshotData": "object" }`

#### AI Token Management
- **GET /tokens/usage**
  - **Response:** `{ "used": "number", "remaining": "number" }`

- **POST /tokens/cap**
  - **Request:** `{ "cap": "number" }`
  - **Response:** `{ "status": "string" }`

#### WebSocket
- **/ws**
  - **Description:** Handles real-time communication for session updates and token usage alerts.

## 4. Data Models

### Users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscription_tier VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Snapshots
```sql
CREATE TABLE snapshots (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### TokenUsage
```sql
CREATE TABLE token_usage (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    used_tokens INT DEFAULT 0,
    token_cap INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Authentication

- **Approach:** Use AWS Cognito for user authentication, issuing JWT tokens upon successful login.
- **Flow:**
  1. User logs in via the mobile or desktop app.
  2. Credentials are verified by AWS Cognito.
  3. A JWT token is issued and used for subsequent API requests.
  4. JWT is validated on each request to secure endpoints.

## 6. State Management

- **iOS:** Use Combine framework for reactive programming and state management.
- **Android:** Use Jetpack Compose state management with ViewModel and LiveData for reactive updates.

## 7. Key Dependencies

- **Express.js:** For building the backend server.
- **Socket.io:** For handling WebSocket connections.
- **Sequelize:** ORM for PostgreSQL.
- **AWS SDK:** For S3 and Cognito integration.
- **RevenueCat SDK:** For handling subscriptions.
- **Kotlin Multiplatform Mobile (KMM):** For shared business logic across iOS and Android.

## 8. Deployment

- **Backend:** Host on AWS EC2 with auto-scaling configured. Use AWS RDS for PostgreSQL and Elasticache for Redis.
- **CI/CD:** Use GitHub Actions for continuous integration and deployment pipelines. Automated tests run on each commit, with deployments triggered for successful builds.
- **Frontend Apps:** Distribute iOS app via TestFlight for beta and App Store for production. Use Google Play Console for Android distribution. Use Electron-builder for desktop agent packaging and updates.