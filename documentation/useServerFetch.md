
PARAMS: (method, endpoint, controller)
```
  method: The method of the request you are making ('get', 'post', etc...)
  endpoint: The server endpoint for the request (what comes after .../hr-rfp/)
  ?body: The body for the request (must be filled in for AbortController use)
  ?controller: The AbortController used to cancel the request (if necessary)
```

RETURN: <Promise> with the same resolution value as an axios fetch request

This hook can be used to directly replace your axios get requests.