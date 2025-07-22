# Newsletter Integration Documentation

## Overview

This project now includes a complete newsletter subscription system integrated with Sanity CMS. Users can subscribe to the newsletter through the homepage, and all subscriber data is stored in Sanity.

## Features Added

### 1. Sanity Schema (`src/sanity/schemas/newsletter.ts`)

- **Email**: Required email address with validation
- **SubscribedAt**: Timestamp of subscription
- **IsActive**: Boolean to manage active/inactive subscriptions
- **FirstName/LastName**: Optional name fields
- **Source**: Tracks where the subscription came from (website, blog post, etc.)

### 2. TypeScript Types (`src/sanity/types.ts`)

- Added `Newsletter` interface for type safety

### 3. Sanity Queries (`src/sanity/queries.ts`)

- `newsletterSubscribersQuery`: Get all active subscribers
- `newsletterByEmailQuery`: Check if email exists

### 4. Sanity Utils (`src/sanity/utils.ts`)

- `subscribeToNewsletter()`: Handle new subscriptions and reactivations
- `getNewsletterSubscribers()`: Fetch all subscribers
- `checkEmailSubscription()`: Check existing subscription status

### 5. API Route (`src/app/api/newsletter/route.ts`)

- Server-side endpoint for secure newsletter subscriptions
- Handles validation and error responses

### 6. Updated Components

- **NewsletterSection**: Now includes first name field and connects to Sanity
- **HomePageContent**: Already integrated with NewsletterSection

### 7. Admin Interface (`src/app/admin/newsletter/page.tsx`)

- View all newsletter subscribers
- Display subscription metrics
- Export subscriber data

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with:

```env
SANITY_API_TOKEN=your_sanity_write_token_here
NEXT_PUBLIC_SANITY_PROJECT_ID=xwvmvdty
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Sanity Studio Setup

1. Go to your Sanity Studio (usually at `/studio`)
2. The newsletter schema will automatically appear
3. Create an API token with write permissions in your Sanity dashboard
4. Add the token to your environment variables

### 3. Permissions

Ensure your Sanity API token has:

- Read access to the dataset
- Write access for creating newsletter documents
- Update access for managing subscriptions

## Usage

### Frontend Integration

The newsletter signup is already integrated into your homepage via the `NewsletterSection` component. Users can:

- Enter their email (required)
- Optionally provide their first name
- Subscribe with proper validation and feedback

### Backend Features

- **Duplicate Prevention**: Checks for existing emails
- **Reactivation**: If someone unsubscribes and re-subscribes, it reactivates their subscription
- **Error Handling**: Comprehensive error handling and user feedback
- **Source Tracking**: Tracks where subscriptions come from

### Admin Dashboard

Visit `/admin/newsletter` to view all subscribers and subscription metrics.

## API Endpoints

### POST `/api/newsletter`

Subscribe to newsletter

```json
{
  "email": "user@example.com",
  "firstName": "John"
}
```

Response:

```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter!",
  "data": {
    /* newsletter object */
  }
}
```

## Database Schema

```typescript
interface Newsletter {
  _id: string;
  _type: "newsletter";
  email: string;
  subscribedAt: string;
  isActive: boolean;
  firstName?: string;
  lastName?: string;
  source: "website" | "blog_post" | "social_media" | "direct";
}
```

## Future Enhancements

1. **Email Integration**: Connect with email providers (Mailchimp, ConvertKit, etc.)
2. **Unsubscribe Flow**: Add unsubscribe functionality
3. **Email Templates**: Create email templates in Sanity
4. **Segmentation**: Add subscriber categories/tags
5. **Analytics**: Track open rates and engagement
6. **Double Opt-in**: Add email confirmation step

## Security Considerations

- API token is server-side only
- Input validation on both client and server
- Rate limiting could be added for production
- Email validation prevents invalid entries

## Testing

1. Test subscription flow on homepage
2. Verify data appears in Sanity Studio
3. Check duplicate email handling
4. Test admin dashboard
5. Verify API responses

The newsletter system is now fully integrated and ready for production use!
