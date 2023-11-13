# Random Number Generation Microservice

## How to _Request_ Data?
1. Send an HTTP request using the GET method to the [localhost:3000/randnum](http://localhost:3000/randnum) endpoint.
2. Set the `upper` query parameter value. This will be used to generate random integers from `1` to `upper`.
3. Receive the random number.

### Request Parameters
Although the `upper` parameter is the only **required** part of the request, there are other optional parameters that could be useful.
- `upper` - the largest generated value. 
- `lower` (optional) - this is `1` by default and it represents the lowest generated value
- `min_limit` (optional) - The minimum accepted value. `1` by default
- `max_limit` (optional) - The maximum accepted value. `1000` by default

## How to _Receive_ Data?
The generated random number will be sent with a `200 OK` response as the value of the `number` key in a JSON object. See the example below.

## Example #1 (200 OK)
> [!NOTE]
> Examples of requests are formatted for readability. The original URL is provided.

Formatted request ([URL](http://localhost:3000/randnum?upper=6): `http://localhost:3000/randnum?upper=6`):
```javascript
{
  upper: '6'
}
```

Response:
```JSON
{
    "number": 4
}
```


## Example #2 (400 Bad Request)
Formatted request ([URL](http://localhost:3000/randnum?lower=0&upper=6): `http://localhost:3000/randnum?lower=0&upper=6`): 
```javascript
{
  lower: '0',
  upper: '6'
}
```
Response:
```JSON
{
    "error": "Out of range - the 'lower' and|or 'upper' values must be in the closed range [1 - 1000]."
}
```
> [!IMPORTANT]
> If you wish to use `0` as a value of `lower`, then you must modify the `min_limit` to be less than or equal to your desired `lower` limit.


## Example #3 (200 OK)
Formatted request ([URL](http://localhost:3000/randnum?lower=0&upper=6&min%20limit=0&max%20limit=10): `http://localhost:3000/randnum?lower=0&upper=6&min%20limit=0&max%20limit=10`):
```javascript
{
   "lower":"10",
   "upper":"16",
   "min limit":"10",
   "max limit":"20"
}
```
Response:
```JSON
{
    "number": 12
}
```
## UML Sequence Diagram
![UML Sequence Diagram](documents/cs361_uml_sequence_diagram.png)
