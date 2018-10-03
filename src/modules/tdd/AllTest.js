describe(" Rotina de completa de testes", () => {

    const admin = {
        email: "admin@rionorte.net",
        password: "102030"
    };

    let logistic = {
        _id:"",
        username:"logistica",
        email:"logistica@mail.com",
        password:"102030",
        role:'logistics',
        isActive:true
    }

    let token = "";

    before(done => {
        console.log('run before in testes');
        done();
    })

    describe("Realizando ações de login", () => {

        it("Realizar login como administrador", done => {

            Server
                .post("/login")
                .send(admin)
                .end((err, res) => {
                    expect(res.body.token).to.be.a('string');
                    token = res.body.token;
                    done(err);
                })
        })

        it("Criar usuário da logistica", done => {

            Server
                .post("/create-account")
                .set('Authorization', `Bearer ${token}`)
                .send(logistic)
                .end((err, res) => {
                    expect(res.body.username).to.be.a('string');
                    expect(res.body.email).to.be.a('string');
                    expect(res.body.role).to.be.a('string');
                    expect(res.body._id).to.be.a('string');
                    expect(res.body.isActive).to.be.a('boolean');
                    logistic._id = res.body._id;
                    done(err);
                })
        })
        
        it("Falha ao realizar login com usuário desconhecido", done => {

            Server
                .post("/login")
                .send({email: "admin@semdominio.net",password: "102030"})
                .end((err, res) => {
                    expect(res.body).to.have.property('err');
                    expect(res.body).to.not.have.property('token');
                    expect(res.body.err).to.be.equal('no tokens');
                    done(err);
                })
        })
    
    })
})