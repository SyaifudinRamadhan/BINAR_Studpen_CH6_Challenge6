const app = require("../index");
const request = require('supertest');

describe('who-am-i', () => {
    it("return status code 200 if token access correct", async () => {
        const res = await request(app).get('/api/v1/who-am-i').set({'x-access-token': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjY1M2YzNjktNGRmNC00M2Y5LWE2NzMtOWVjNjEwMzU5NDI1IiwiaWF0IjoxNjY4NTY3MDI3fQ.xbq8BjYAbn8Nhm25Z31F5CLDNT6W0HdmH7C-KG6Yy5w"});
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        
    });

})