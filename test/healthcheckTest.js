const request = require("request");
const app = require("../index");

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
var expect = chai.expect;

describe('API Health Check', () => {
    it('Hello Picmoney Test', function() {
        chai.request(app)
            .get('/')
            .end(function(err, res){
                expect(res).to.have.status(200);
            });
    });
});