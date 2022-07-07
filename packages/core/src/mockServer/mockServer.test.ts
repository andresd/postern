import { createEmptyEndpoint, createEmptyResponse, MockServer } from './mockServer'

describe('MockServer', () => {
  describe('findEndpoint', () => {
    const mockServer = new MockServer()
    beforeAll(() => {
      const newEndpoint = createEmptyEndpoint(mockServer.endpoints)
      newEndpoint.method = 'GET'
      newEndpoint.path = '/user/:id'
      mockServer.addEndpoint(newEndpoint)
    })

    it('should return null when method don\'t match', () => {
      const result = mockServer.findEndpoint('POST', '/api/user/6?name="the name"')
      expect(result).toBeNull()
    })

    it('should return null when url don\'t match', () => {
      const result = mockServer.findEndpoint('GET', '/api/user_other/6?name="the name"')
      expect(result).toBeNull()
    })

    it('should return null when method and url don\'t match', () => {
      const result = mockServer.findEndpoint('PUT', '/api/user_other?name="the name"')
      expect(result).toBeNull()
    })

    it('should return endpoint when method and url matches', () => {
      const result = mockServer.findEndpoint('GET', '/api/user/88?name="the name"')
      expect(result).not.toBeNull()
    })

    it('should return endpoint when method and url matches regardless of querystring', () => {
      const result = mockServer.findEndpoint('GET', '/api/user/5')
      expect(result).not.toBeNull()
    })
  })
  describe('getValidResponse', () => {
    const mockServer = new MockServer()
    const newEndpoint = createEmptyEndpoint(mockServer.endpoints)

    newEndpoint.method = 'GET'
    newEndpoint.path = '/user/:id'
    mockServer.addEndpoint(newEndpoint)
    const newResponse = createEmptyResponse(newEndpoint)
    newResponse.statusCode = 200
    newResponse.isActive = true
    newResponse.template = 'Successful'

    describe('test equal rules', () => {
      it('should return null when param do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'param',
            path: 'id',
            operator: 'equals',
            value: '5'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/6', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when param match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'param',
            path: 'id',
            operator: 'equals',
            value: '5'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).not.toBeNull()
      })

      it('should return null when header do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'header',
            path: 'Content-Type',
            operator: 'equals',
            value: 'application/json'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when header match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'header',
            path: 'Content-Type',
            operator: 'equals',
            value: 'application/json'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', { 'Content-Type': 'application/json' }, {})
        expect(result).not.toBeNull()
      })

      it('should return null when qs do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'querystring',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when qs match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'querystring',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, {})
        expect(result).not.toBeNull()
      })

      it('should return null when body do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'body',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, { name: 'name' })
        expect(result).toBeNull()
      })
      it('should return response when body match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'body',
            path: 'name',
            operator: 'equals',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, { name: 'the name' })
        expect(result).not.toBeNull()
      })
    })

    describe('test regex rules', () => {
      it('should return null when param do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'param',
            path: 'id',
            operator: 'regex',
            value: '^[0-9]+$'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/d', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when param match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'param',
            path: 'id',
            operator: 'regex',
            value: '^[0-9]+$'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).not.toBeNull()
      })

      it('should return null when header do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'header',
            path: 'Content-Type',
            operator: 'regex',
            value: '^[json]+$'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when header match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'header',
            path: 'Content-Type',
            operator: 'regex',
            value: 'json'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5', { 'Content-Type': 'application/json' }, {})
        expect(result).not.toBeNull()
      })

      it('should return null when qs do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'querystring',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, {})
        expect(result).toBeNull()
      })
      it('should return response when qs match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'querystring',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, {})
        expect(result).not.toBeNull()
      })

      it('should return null when body do not match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'body',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?z=4', {}, { name: 'name' })
        expect(result).toBeNull()
      })
      it('should return response when body match equal rule', () => {
        newResponse.rules = [
          {
            enabled: true,
            id: 1,
            type: 'body',
            path: 'name',
            operator: 'regex',
            value: 'the name'
          }
        ]
        newEndpoint.responses = [newResponse]
        mockServer.setEndpoint(newEndpoint)
        const result = mockServer.getValidResponse(newEndpoint, '/api/user/5?name=the%20name', {}, { name: 'the name' })
        expect(result).not.toBeNull()
      })
    })
  })
})
