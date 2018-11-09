import db from '../config/db';

describe(" Rotina [ Account ] completa de testes", () => {

    const accountRequest = {
        method:'POST',
        url:'/create-account',
        payload: {
            fullName:'Conta de Teste',
            username:'teste001',
            email:'teste001@mail.com',
            password:'102030',
            role:'financial',
            isActive:true
        }
    };

    let token = "";

    before(done => {
        db.dropCollection('account').then(() => {
            console.log('Run before testes');
        })
        done();
    })

    describe("Cadastra nova conta", () => {

        it("Realiza cadastro", done => {

            Server
                .inject(accountRequest,(response) => {
                    console.log(response);
                    done();
                })
        })
    });

    /*
    describe("Realizando ações de login", () => {

        it("Realizar login como administrador", done => {

            Server
                .post("/login")
                .send(account)
                .end((err, res) => {
                    expect(res.body.token).to.be.a('string');
                    token = res.body.token;
                    done(err);
                })
        })
        
    })
    */
})