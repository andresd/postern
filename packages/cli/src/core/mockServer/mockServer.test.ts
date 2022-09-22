import { createEmptyEndpoint, createEmptyResponse, MockServer } from './mockServer'

describe('MockServer', () => {
  describe('findEndpoint', () => {
    const mockServer = new MockServer()
    mockServer.prefix = '/api'
    beforeAll(() => {
      const newEndpoint = createEmptyEndpoint(mockServer.endpoints)
      newEndpoint.method = 'GET'
      newEndpoint.path = 'user/:id'
      mockServer.addEndpoint(newEndpoint)
    })

    it('should return null when method don\'t match', () => {
      const result = mockServer.findEndpoint('POST', 'http://localhost/api/user/6?name="the name"')
      expect(result).toBeNull()
    })

    it('should return null when url don\'t match', () => {
      const result = mockServer.findEndpoint('GET', 'http://localhost/api/user_other/6?name="the name"')
      expect(result).toBeNull()
    })

    it('should return null when method and url don\'t match', () => {
      const result = mockServer.findEndpoint('PUT', 'http://localhost/api/user_other?name="the name"')
      expect(result).toBeNull()
    })

    it('should return endpoint when method and url matches', () => {
      const result = mockServer.findEndpoint('GET', 'http://localhost/api/user/88?name="the name"')
      expect(result).not.toBeNull()
    })

    it('should return endpoint when method and url matches regardless of querystring', () => {
      const result = mockServer.findEndpoint('GET', 'http://localhost/api/user/5')
      expect(result).not.toBeNull()
    })
  })
  describe('getValidResponse', () => {
    const mockServer = new MockServer()
    const newEndpoint = createEmptyEndpoint(mockServer.endpoints)

    newEndpoint.method = 'GET'
    newEndpoint.path = '/api/user/:id'
    mockServer.addEndpoint(newEndpoint)
    const firstResponse = createEmptyResponse(newEndpoint)
    firstResponse.statusCode = 200
    firstResponse.isActive = true
    firstResponse.template = 'Successful'
    const secondResponse = createEmptyResponse(newEndpoint)
    secondResponse.statusCode = 400
    secondResponse.isActive = true
    secondResponse.template = 'Fail'

    describe('test equal rules', () => {
      it('should return null when param do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'param',
            path: 'id',
            operator: 'equals',
            value: '5'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/6', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when param match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'param',
            path: 'id',
            operator: 'equals',
            value: '5'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).not.toBeNull()
      })
      it('should return null when header do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'header',
            path: 'Content-Type',
            operator: 'equals',
            value: 'application/json'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when header match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'header',
            path: 'Content-Type',
            operator: 'equals',
            value: 'application/json'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', { 'Content-Type': 'application/json' }, {})
        expect(result).not.toBeNull()
      })
      it('should return null when qs do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when qs match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, {})
        expect(result).not.toBeNull()
      })
      it('should return null when body do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'body',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, { name: 'name' })
        expect(result).toBeNull()
      })
      it('should return response when body match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'body',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, { name: 'the name' })
        expect(result).not.toBeNull()
      })
    })

    describe('test regex rules', () => {
      it('should return null when param do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'param',
            path: 'id',
            operator: 'regex',
            value: '^[0-9]+$'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/d', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when param match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'param',
            path: 'id',
            operator: 'regex',
            value: '^[0-9]+$'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).not.toBeNull()
      })
      it('should return null when header do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'header',
            path: 'Content-Type',
            operator: 'regex',
            value: '^[json]+$'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when header match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'header',
            path: 'Content-Type',
            operator: 'regex',
            value: 'json'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', { 'Content-Type': 'application/json' }, {})
        expect(result).not.toBeNull()
      })
      it('should return null when qs do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when qs match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, {})
        expect(result).not.toBeNull()
      })
      it('should return null when body do not match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'body',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, { name: 'name' })
        expect(result).toBeNull()
      })
      it('should return response when body match equal rule', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'body',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, { name: 'the name' })
        expect(result).not.toBeNull()
      })
    })

    describe('test qs rules', () => {
      it('should return response when body qs has field with any value', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'test',
            operator: 'any',
            value: 'any'
          }
        ]
        newEndpoint.responses = [firstResponse, secondResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?test=1', {}, {})
        expect(result).not.toBeNull()
      })
      it('should return null when qs has param not found', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'test',
            operator: 'any',
            value: 'any'
          }
        ]
        newEndpoint.responses = [firstResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?tst=1', {}, {})
        expect(result).toBeNull()
      })
      it('should return second ruleless response when qs param has incorrect value', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'test',
            operator: 'equals',
            value: '1234'
          }
        ]
        newEndpoint.responses = [firstResponse, secondResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?test=1', {}, {})
        expect(result?.statusCode).toBe(400)
      })
      it('should return second response (ruleless) when first don\'t match first rule (qs equals values)', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'test',
            operator: 'equals',
            value: '1234'
          }
        ]
        newEndpoint.responses = [firstResponse, secondResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?test=1&name=fff', {}, {})
        expect(result?.statusCode).toBe(400)
      })
      it('should return match second response rule (qs equals values)', () => {
        firstResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'test',
            operator: 'equals',
            value: '1234'
          }
        ]
        secondResponse.rules = [
          {
            enabled: true,
            type: 'querystring',
            path: 'test',
            operator: 'equals',
            value: '1235'
          }
        ]
        newEndpoint.responses = [firstResponse, secondResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?test=1235&name=fff', {}, {})
        expect(result?.statusCode).toBe(400)
      })
    })
  })
})
