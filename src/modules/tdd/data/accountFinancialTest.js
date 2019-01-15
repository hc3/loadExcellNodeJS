describe(" Rotina [ Account ] completa de testes", () => {

    const accountRequest = {
        method: 'POST',
        url: '/create-account',
        payload: {
            fullName: 'Usuário do financeiro',
            username: 'financeiro',
            email: 'financeiro@mail.com',
            password: '102030',
            role: 'financial',
            isActive: true
        }
    };
    
    const updateAccountRequest = {
        method: 'PUT',
        url:'',
        headers: {
            Authorization:''
        },
        payload: {
            _id:'',
            fullName: 'Usuário do financeiro Updated',
            username: 'Financeiro Updated',
            email: 'financeiro-updated@mail.com',
            password: '405060',
            role: 'financial',
            isActive: true
        }
    }

    const loginSuccessRequest = {
        method: 'POST',
        url: '/login',
        payload: {
            email: 'financeiro@mail.com',
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

    describe("Cadastra nova conta2", () => {

        it("Realiza cadastro com sucesso [ FINANCEIRO ]", done => {

            Server
                .inject(accountRequest)
                .then((response) => {

                    expect(response.result.email).to.be.a('string');
                    expect(response.result.isActive).to.be.a('boolean');
                    expect(response.result.username).to.be.a('string');
                    expect(response.result.role).to.be.a('string');
                    updateAccountRequest.payload._id = response.result._id;

                    expect(response.result.email).to.be.equal(accountRequest.payload.email);
                    expect(response.result.isActive).to.be.equal(accountRequest.payload.isActive);
                    expect(response.result.username).to.be.equal(accountRequest.payload.username);
                    expect(response.result.role).to.be.equal(accountRequest.payload.role);

                    done();
                })
                .catch((err) => {
                    done(err);
                })
        });

/*
        it("Faz login com sucesso [ FINANCEIRO ]", done => {

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

                    updateAccountRequest.headers.Authorization = `Bearer ${response.result.token}`;

                    done();
                })
                .catch((err) => {
                    done(err);
                })
        });


        it("Erro ao fazer login [ FINANCEIRO ]", done => {

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

        it("Sucesso ao tentar alterar usuário [COM LOGIN DO FINANCEIRO ]", done => {
            updateAccountRequest.url = `/update-account/${updateAccountRequest.payload._id}`;
            Server
                .inject(updateAccountRequest)
                .then((response) => {
                    console.log('Result: ',response.result);
                })
            done();
        })

        it("Erro ao tentar buscar todos os usuários [ COM LOGIN DO FINANCEIRO ]", done => {

            done();
        });

        it("Sucesso ao buscar os próprios dados [ COM LOGIN DO FINANCEIRO ]", done => {

            done();
        });

        it("Erro ao tentar editar outro usuário [ COM LOGIN DO FINANCEIRO ]", done => {

            done();
        })

        it("Sucesso ao alterar os próprios dados [ COM LOGIN DO FINANCEIRO ]", done => {

            done();
        })
*/

        after(async () => {
            console.log('Rodando o after');
            Server.app.db.dropDatabase()
                .then(() => {
                    console.log('Removendo todos os dados do banco antes dos testes...');
                    process.exit(1);
                });
        });


    });

})