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

    describe("Cadastra nova conta", () => {
        
        it("Realiza cadastro com sucesso", done => {

            Server
                .inject(accountRequest)
                .then((response) => {

                    //expect(response.result._id).to.be.a('string');
                    //expect(response.result._id).to.have.lengthOf(24);

                    expect(response.result.email).to.be.a('string');
                    expect(response.result.isActive).to.be.a('boolean');
                    expect(response.result.username).to.be.a('string');
                    expect(response.result.role).to.be.a('string');
        
                    done();
                })
                .catch((err) => {
                    done(err);
                })
        });

        
        it("Faz login com sucesso", done => {

            Server
                .inject(loginSuccessRequest)
                .then((response) => {

                    done();
                })
                .catch((err) => {
                    done(err);
                })
        });

        it("Erro ao fazer login", done => {

            Server
                .inject(loginErrorRequest)
                .then((response) => {

                    done();
                })
                .catch((err) => {
                    done(err);
                })

        });

        after(async () => {
            Server.app.db.dropDatabase().then(() => {
                console.log('Removendo todos os dados do banco antes dos testes...');
                process.exit(1);
            });
            
        });


    });

})