module.exports = {
  'open-erp-api': {
    input: './swagger.json',
    output: {
      mode: 'tags-split',
      target: './app/lib/api/generated',
      schemas: './app/lib/api/model',
      client: 'fetch',
      baseUrl: 'http://localhost:3002/api',
    },
  },
};
