# DevTinder API List

## authRouter

- POST /signup: create a new account
- POST /login: log in and receive the JWT cookie
- POST /logout: clear the cookie and log out

## profileRouter

- GET /profile/view: view your own profile
- PATCH /profile/edit: edit your own profile
- PATCH /profile/password: change your password

## connectionRequestRouter

- POST /request/send/:status/:toUserId: send a request, status is `interested` or `ignored`
- POST /request/review/:status/:requestId: review a received request, status is `accepted` or `rejected`

## userRouter

- GET /user/requests/received: list the connection requests you have received
- GET /user/connections: list your connections (matches)
- GET /user/feed: discover other users, paginated
