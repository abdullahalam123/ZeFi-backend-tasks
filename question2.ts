// test cases
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import express from "express";
import * as pingRoutes from "./ping-route.ts";

chai.use(chaiHttp);

const app = express();
app.use("/api/v1", pingRoutes.pingRouter);

describe("Ping API Test Suite", function () {
  this.timeout(8000);

  before(async function () {
    // Perform setup before running the test cases
  });

  it("should retrieve the health status of the instance", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.ping).to.equal("pong!");
      });
  });

  it("should return 404 for an invalid route", async function () {
    return chai
      .request(app)
      .get("/api/v1/invalid")
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });

  it("should handle server errors and return 500 with error message", async function () {
    pingRoutes.pingRouter.get("/ping-error", function (req, res) {
      res.status(500).send({ error: "Server Error" });
    });

    return chai
      .request(app)
      .get("/api/v1/ping-error")
      .then(function (res) {
        expect(res).to.have.status(500);
        expect(res.body.error).to.equal("Server Error");
      });
  });

  it("should include a valid ID in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("id");
        expect(res.body.instance.id).to.be.a("string").and.not.empty;
      });
  });

  it("should include a valid name in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("name");
        expect(res.body.instance.name).to.be.a("string").and.not.empty;
      });
  });

  it("should have a null description in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("description");
        expect(res.body.instance.description).to.be.null;
      });
  });

  it("should have a null image in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("image");
        expect(res.body.instance.image).to.be.null;
      });
  });

  it("should have a null correspondenceEmail in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("correspondenceEmail");
        expect(res.body.instance.correspondenceEmail).to.be.null;
      });
  });

  it("should have a null correspondenceUserID in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("correspondenceUserID");
        expect(res.body.instance.correspondenceUserID).to.be.null;
      });
  });

  it("should have a null frontPage in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("frontPage");
        expect(res.body.instance.frontPage).to.be.null;
      });
  });

  it("should have a null tosPage in the instance response", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.instance).to.have.property("tosPage");
        expect(res.body.instance.tosPage).to.be.null;
      });
  });

  it("should return 401 if not authorized", async function () {
    return chai
      .request(app)
      .get("/api/v1/ping")
      .set("Authorization", "Bearer invalidToken")
      .then(function (res) {
        expect(res).to.have.status(401);
      });
  });

  it("should return 400 if required parameters are missing", async function () {
    return chai
      .request(app)
      .post("/api/v1/ping")
      .send({})
      .then(function (res) {
        expect(res).to.have.status(400);
      });
  });

  after(async function () {
    // Perform cleanup after running the test cases
  });
});

