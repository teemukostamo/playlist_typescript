# Documentation for developers

To use the API with Postman, set the following Postman environment variables:

- URL - the url where the backend is running, for example `localhost:5000`
- TOKEN - use Postman to login with valid credentials, then set the returned token as the value of the TOKEN environment variable
- Set the request header key-value pairs for each request like so:
  | key | value |
  | :--------: | :----: |
  | Content-Type | Application/json |
  | Authorization | bearer {{TOKEN}} |

  [API documentation](https://playlist-demo.teemukostamo.com/backend-documentation)
