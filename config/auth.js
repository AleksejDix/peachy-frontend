export default {
  localStorage: {
    prefix: 'peachy.'
  },
  strategies: {
    local: {
      endpoints: {
        login: {
          url: '/auth/local',
          method: 'post',
          propertyName: 'jwt'
        },
        user: {
          url: '/users/me',
          method: 'get',
          propertyName: false
        },
        logout: false
      },
      tokenRequired: true,
      tokenType: 'bearer',
    },
    github: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    },
  }
}
