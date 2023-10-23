## Getting Started

First, make new file `.env.local`, copy content from `.example-env` and fill with the corresponding environment variables

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will see the home page with list of available products and avatar for user login/logout

## Registration

Go to [http://localhost:3000/signup](http://localhost:3000/signup) to register new user.

You will not have an option to go directly there. You will be offered to login, and if you don't have
an account, you will have option to go to sign up page.

## Sign in

Clicking on the avatar icon, you will have an option to go to login page:
Page: [http://localhost:3000/login](http://localhost:3000/login)
Session will be stored and you will have an option to sign out, clicking at the avatar sign again.

If user is logged in, accessing the pages `login` and `signup` will be handled with middleware and user will be redirected to the
home page.

## What is used for making this application work

- MUI and Styled components for UI
- Formik and Yup for form validation
- Axios for requests
- Tanstack Query for handling queries and mutations
- cookies-next for cookies handling
- NextAuth for authentication and session management
- And of course TypeScript for type checking
