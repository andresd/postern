# Endpoints

#### Example:
```yaml
endpoints:
  - id: 1
    path: api/user/:id
    method: GET
    responses:
      - endpointId: 1
        id: 1
        statusCode: 200
        isActive: true
        template: |
          {
            "data": {
              "first_name": "{{faker 'name.firstName()'}}",
              "last_name": "{{faker 'name.lastName()'}}"
            }
          }
        headers: []
        rules: []
    description: Get User Info
    redirectEnabled: false
    redirect: ""
    reUseQueryStringInRedirect: false
    isActive: false
```
