# Backend Setup for MongoDB Integration

This guide will help you set up the backend server to connect your contact form to MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local installation or MongoDB Atlas account)
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables

### 2. Set Up MongoDB

#### Option a: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/portfolio_contacts`

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_contacts
PORT=3000
```

### 4. Update Frontend API URL

Edit `contact-form.js` and update the `API_URL`:

```javascript
const API_URL = 'http://localhost:3000/api/contact'; // For local development
// Or use your deployed backend URL: 'https://your-backend-url.com/api/contact'
```

### 5. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### POST `/api/contact`
Submit a contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you..."
}
```

**Response:**
```json
{
  "message": "Contact form submitted successfully!",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET `/api/contacts`
Get all contact submissions (for admin purposes)

### GET `/api/contacts/:id`
Get a specific contact by ID

## Deployment

### Deploy Backend to Heroku/Railway/Render

1. Create account on hosting platform
2. Connect your repository
3. Add environment variables:
   - `MONGODB_URI`
   - `PORT` (usually auto-set by platform)
4. Deploy

### Update Frontend

After deploying, update `contact-form.js` with your production API URL:

```javascript
const API_URL = 'https://your-backend-url.com/api/contact';
```

## Testing

Test the API using curl or Postman:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Security Notes

- Add authentication for GET endpoints in production
- Add rate limiting to prevent spam
- Validate and sanitize all inputs
- Use HTTPS in production
- Add CORS restrictions for production

## Troubleshooting

### Connection Issues
- Check MongoDB connection string
- Ensure MongoDB is running (if local)
- Check firewall settings

### CORS Errors
- Update CORS settings in `server.js`
- Add your frontend domain to allowed origins

### Form Not Submitting
- Check browser console for errors
- Verify API URL is correct
- Check network tab for request/response

