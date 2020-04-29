const request = require("supertest");
const server = require('../../../index')

const clients = require('../../../../data/models/clients')

describe("\n * clients", function() {
  // test the POST for register
  describe("\n * POST /register", function() {
    it("should return new user with application/json", function() {
      return request(server)
        .post("/api/auth/clients/register")
        .then(res => {
          expect(res.type).toMatch("application/json");
        });
    });
  });

  describe("\n * POST /register err", function() {
    it("should not return JSON", function() {
      return request(server)
        .post("/api/auth/clients/registerr")
        .then(res => {
          expect(res.type).not.toMatch(/json/i);
       
        });
    });
  });

   // test the POST for login
describe("\n * POST /login", function() {
  it("should return JSON", function() {
    return request(server)
      .post("/api/auth/clients/login")
      .then(res => {
        expect(res.type).toMatch(/json/i);
      });
  });
});

describe("\n * POST /login err", function() {
  it("should not match text/html", function() {
    return request(server)
      .post("/api/auth/clients/login")
      .then(res => {
        expect(res.type).not.toMatch("text/html");
       
      });
  });
});
});
  