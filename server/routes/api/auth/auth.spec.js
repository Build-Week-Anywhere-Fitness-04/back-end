const request = require("supertest");
const server = require('../../../../server/index')

const clients = require('../../../../data/models/clients')


describe("\n * clients", function() {
    // test the POST for register
    describe("\n * POST /register", function() {
      it("should return new user with text/html", function() {
        return request(server)
          .post("/api/auth/register")
          .then(res => {
            expect(res.type).toMatch("text/html");
          });
      });
    });
  
    describe("\n * POST /register err", function() {
      it("should not return JSON", function() {
        return request(server)
          .post("/api/auth/register")
          .then(res => {
            expect(res.type).not.toMatch(/json/i);
         
          });
      });
    });

     // test the POST for login
  describe("\n * POST /login", function() {
    it("should return JSON", function() {
      return request(server)
        .post("/api/auth/login")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });

  describe("\n * POST /login err", function() {
    it("should not match text/html", function() {
      return request(server)
        .post("/api/auth/login")
        .then(res => {
          expect(res.type).not.toMatch("text/html");
         
        });
    });
  });
    // To test, change the users id and match the username
    it("should return user that is registered", function() {
      return Users.findById(4).then(res => {
        expect(res.username).toBe("george3");
      });
    });
  });