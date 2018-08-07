let app = require("../../../index")
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const sinon = require('sinon');

chai.use(chaiHttp);

var expect = chai.expect;

describe('Integration - API Test', () => {

    let sandbox;
    
    beforeEach('before testing', async () => {
        sandbox = sinon.sandbox.create();
        //sandbox.stub(neoGeocoderUtils, 'retrieveAddressAndLatLongByZipcode')
         //   .returns({ latitude:'latitude', longitude:'longitude', country:'country', city:'city',
          //          zipcode:'zipcode', streetName:'street', streetNumber:'number', state:'state'
          //  })
    });

    afterEach('Reset after testing', async ()=>{
        sandbox.restore();
    })

    it('Register User - Should be 400 when body isnt sent', function() {
        chai.request(app)
            .post('/api/user/register')
            .end(function(err, res){
                expect(res).to.have.status(401);
            });
    });
});
