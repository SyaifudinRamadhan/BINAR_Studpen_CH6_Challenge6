const app = require("../index");
const request = require('supertest');

describe('login', () => {

    it("return status code 200 if username and password correct", async () => {
        const res = await request(app).post('/api/v1/login').send({
            username:"super_admin",
            password: "admin"
        }).set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        
    });

})