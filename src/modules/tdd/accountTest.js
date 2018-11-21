describe(" Rotina [ Account ] completa de testes", () => {

    const accountRequest = {
        method: 'POST',
        url: '/create-account',
        payload: {
            fullName: 'Conta de Teste',
            username: 'teste001',
            email: 'teste001@mail.com',
            password: '102030',
            role: 'financial',
            isActive: true
        }
    };

    const loginSuccessRequest = {
        method: 'POST',
        url: '/login',
        payload: {
            email: 'teste001@mail.com',
            password: '102030'
        }
    }

    const loginErrorRequest = {
        method: 'POST',
        url: '/login',
        payload: {
            email: 'teste00@mail.com',
            password: '102030'
        }
    }

    let token = "";

    describe("Cadastra nova conta", () => {

        it("Realiza cadastro com sucesso", done => {

            Server
                .inject(accountRequest)
                .then((response) => {

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

                    expect(response.result).to.be.have.property('token')
                    expect(response.result).to.be.have.property('idUser');
                    expect(response.result).to.be.have.property('isActive');
                    expect(response.result).to.be.have.property('role');
                    expect(response.result.token).to.be.a('string');
                    expect(response.result.role).to.be.equal(accountRequest.payload.role);
                    expect(response.result).to.be.have.property('idUser');
                    expect(response.result).to.be.have.property('isActive');
                    expect(response.result).to.be.have.property('role');

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
                    expect(response.result.err).to.be.equal(true);
                    expect(response.result.message).to.be.equal('no tokens');
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