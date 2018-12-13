const request = require("supertest");
const assert = require("assert");

const app = require("../app");
let token;

describe('# auth and registration', () => {
  it("Test auth", function (done) {
    this.timeout(5000);
    request(app)
      .post("/auth")
      .send({ login: "root", password: "fusion" })
      .expect(200)
      .then(resp => {
        assert(resp.body.roleUser === "admin", resp.body.token !== null)
        token = resp.body.token
        done()
      })
  });

it("Test car filtering", function (done) {
  request(app)
    .get("/filter-car?priceUp=&priceDown=&yearDown=All%20years&yearUp=All%20years&search=")
    // .get("/filter-car")
    .set('Authorization', `Bearer ${token}`)
    .expect(function (response) {
      // console.log('res', response.body);
      assert(response.body.length, 17);
    })
    .end(done);
});


describe('# home-page', () => {
  it('Test home-page generate', function (done) {
    this.timeout(5000);

    request(app)
      .post('/home-page')
      .send({ url: 'https://chrome.google.com/webstore/category/extensions?hl=ru' })
      .set('Accept', 'application/json')
      .expect(200)
      .then(resp => {
        assert(resp.body.message === 'Generate was successful')
        done()
      })
  });

  it("Test home-page savedb", function (done) {
    this.timeout(5000);
    request(app)
      .post("/home-page/savedb")
      .send({ url: 'https://chrome.google.com/webstore/category/extensions?hl=ru', urlShorten: 'as32as24', role: 'admin' })
      .expect(200)
      .then(resp => {
        assert(resp.body.message === "successful" || resp.body.message === "short URL found in DB");
        done()
      })
  });
});
describe('# panel admin', () => {
  it("Test change password", function (done) {
    this.timeout(5000);
    request(app)
      .post("/user/fusion")
      .send({ newPassword: 'fusion123', user: "fusion" })
      .expect(200)
      .then(resp => {
        assert(resp.body.message === "Password succsessfully updated" || resp.body.message === "New password field can not be empty");
        done()
      })
  });

  it("Test change role", function (done) {
    this.timeout(5000);
    request(app)
      .post("/user/role")
      .send({ user: "fusion", changeRoleUser: "user" })
      .expect(200)
      .then(resp => {
        assert(resp.body.message === "Role succsessfully updated");
        done()
      })
  });
})
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJwYXNzd29yZCI6ImZ1c2lvbiIsImlhdCI6MTUzMzEwNTkxOH0.4JSCvRUJs793EJzsnAkgNYadqasKz1B_4kq4vxDJKGY


  it("Test registration", function (done) {
    this.timeout(5000);
    request(app)
      .post("/registr")
      .send({ login: "qwesssgdre", password: "edeqws" })
      .expect(200)
      .then(resp => {
        assert(resp.body.message === "registration completed successfully");
        done()
      })
  });
})