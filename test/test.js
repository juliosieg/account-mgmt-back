var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;

const PORT = process.env.PORT || 8001

const production  = 'https://shielded-tundra-59840.herokuapp.com/api';
const development = 'http://localhost:'+PORT+'/api';
const urlBase = (process.env.NODE_ENV ? production : development);


describe('Criar conta bancária', function() {

  var accountId = '';

  it("Cria uma nova conta",function(done){

    request.post(
      {
        url : urlBase + "/account",
        json: {
          "number": "123",
	        "owner": "Proprietário"
        }
      },
      function(error, response, body){

        expect(response.statusCode).to.equal(201);

        if(body.should.have.property('owner')){
          expect(body.owner).to.equal('Proprietário');
        }

        accountId = body.id;

        done(); 
      }
    )
  });

  it("Listar info da conta",function(done){

    request.get(
      {
        url : urlBase + "/account/" + accountId
      },
      function(error, response, body){

        body = JSON.parse(body);

        expect(response.statusCode).to.equal(200);

        if(body.should.have.property('owner')){
          expect(body.owner).to.equal('Proprietário');
        }

        done(); 
      }
    )
  });

  it("Remover conta de teste",function(done){

    request.delete(
      {
        url : urlBase + "/account/" + accountId
      },
      function(error, response){
        expect(response.statusCode).to.equal(204);
        done(); 
      }
    )
  });
});


describe('Realizar transações financeiras', function() {

  var accountId = '';

  it("Cria uma nova conta",function(done){

    request.post(
      {
        url : urlBase + "/account",
        json: {
          "number": "123",
	        "owner": "Proprietário",
          "balance": 500
        }
      },
      function(error, response, body){

        expect(response.statusCode).to.equal(201);

        if(body.should.have.property('owner')){
          expect(body.owner).to.equal('Proprietário');
        }

        if(body.should.have.property('balance')){
          expect(body.balance).to.equal(500);
        }

        accountId = body.id;

        done(); 
      }
    )
  });

  it("Realizar pagamento sem saldo suficiente",function(done){

    request.post(
      {
        url : urlBase + "/account/" + accountId + '/actions',
        json: {
          "type": 1,
	        "description": "Novo pagamento",
          "value": 1000
        }
      },
      function(error, response, body){

        expect(response.statusCode).to.equal(500);
        expect(body).include('Saldo insuficiente');

        done(); 
      }
    )
  });

  it("Realizar pagamento com saldo suficiente",function(done){

    request.post(
      {
        url : urlBase + "/account/" + accountId + '/actions',
        json: {
          "type": 1,
	        "description": "Novo pagamento",
          "value": 10
        }
      },
      function(error, response, body){

        expect(response.statusCode).to.equal(201);

        done(); 
      }
    )
  });

  it("Realizar depósito",function(done){

    request.post(
      {
        url : urlBase + "/account/" + accountId + '/actions',
        json: {
          "type": 3,
	        "description": "Novo depósito",
          "value": 1000
        }
      },
      function(error, response, body){

        expect(response.statusCode).to.equal(201);

        done(); 
      }
    )
  });

  it("Realizar saque sem saldo suficiente",function(done){

    request.post(
      {
        url : urlBase + "/account/" + accountId + '/actions',
        json: {
          "type": 2,
	        "description": "Novo saque",
          "value": 10000
        }
      },
      function(error, response, body){

        expect(response.statusCode).to.equal(500);
        expect(body).include('Saldo insuficiente');

        done(); 
      }
    )
  });

  it("Realizar saque",function(done){

    request.post(
      {
        url : urlBase + "/account/" + accountId + '/actions',
        json: {
          "type": 2,
	        "description": "Novo saque",
          "value": 10.35
        }
      },
      function(error, response, body){

        expect(response.statusCode).to.equal(201);
        done(); 
      }
    )
  });

  it("Validar saldo final da conta",function(done){

    request.get(
      {
        url : urlBase + "/account/" + accountId,
      },
      function(error, response, body){

        body = JSON.parse(body);

        expect(response.statusCode).to.equal(200);

        if(body.should.have.property('balance')){
          expect(body.balance).to.equal(1479.65);
        }

        done(); 
      }
    )
  });
  
  it("Remover conta de teste",function(done){

    request.delete(
      {
        url : urlBase + "/account/" + accountId
      },
      function(error, response){
        expect(response.statusCode).to.equal(204);
        done(); 
      }
    )
  });
});
