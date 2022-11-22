// Criação do Banco de Dados
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('avaliacoes/avaliacao-07/BD_SCA.db');

db.serialize(function() {
	// Criação das Tabelas
	db.run(`CREATE TABLE IF NOT EXISTS TB_ALUNO (
 				id INTEGER NOT NULL,
	 			nome TEXT NOT NULL,
	 			cpf TEXT NOT NULL UNIQUE,
                PRIMARY KEY ("id" AUTOINCREMENT)
			)`);

	db.run(`CREATE TABLE IF NOT EXISTS TB_PROFESSOR (
                id INTEGER NOT NULL,
                nome TEXT NOT NULL,
                PRIMARY KEY ("id" AUTOINCREMENT)
            )`);

	db.run(`CREATE TABLE IF NOT EXISTS TB_DISCIPLINA (
                id INTEGER NOT NULL,
                nome TEXT NOT NULL,
                PRIMARY KEY ("id" AUTOINCREMENT)
            )`);

	db.run(`CREATE TABLE IF NOT EXISTS TB_MATRICULA (
                id INTEGER NOT NULL,
                aluno_id INTEGER NOT NULL,
                disciplina_id INTEGER NOT NULL,
                professor_id INTEGER NOT NULL,

                PRIMARY KEY ("id" AUTOINCREMENT)
                FOREIGN KEY ("aluno_id") REFERENCES "TB_ALUNO"("id"),
                FOREIGN KEY ("disciplina_id") REFERENCES "TB_DISCIPLINA"("id"),
                FOREIGN KEY ("professor_id") REFERENCES "TB_PROFESSOR"("id")
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS TB_PROFESSOR_DISCIPLINA (
                id INTEGER NOT NULL,
                disciplina_id INTEGER NOT NULL,
                professor_id INTEGER NOT NULL,

                PRIMARY KEY ("id" AUTOINCREMENT)
                FOREIGN KEY ("disciplina_id") REFERENCES "TB_DISCIPLINA"("id"),
                FOREIGN KEY ("professor_id") REFERENCES "TB_PROFESSOR"("id")
            )`);

    // Inserindo Dados nas Tabelas
	db.run(`INSERT INTO TB_ALUNO (nome, cpf)
            VALUES ("Pedro Cauan", "600.500.400-30"),
                   ("João Gabriel", "999.777.555-11")`);

	db.run(`INSERT INTO TB_PROFESSOR (nome)
            VALUES ("Ricardo Taveira"),
                   ("Francisco Joselito"),
                   ("Kiara Costa")`);

	db.run(`INSERT INTO TB_DISCIPLINA (nome)
            VALUES ("Banco de Dados"),
                   ("Física Eletricidade"),
                   ("Matemática IV")`);

	db.run(`INSERT INTO TB_MATRICULA (aluno_id, disciplina_id, professor_id)
            VALUES (1, 1, 1),
                   (1, 2, 2),
                   (2, 2, 2),
                   (2, 3, 3)`);

	db.run(`INSERT INTO TB_PROFESSOR_DISCIPLINA (disciplina_id, professor_id)
            VALUES (1, 1),
                   (2, 2),
                   (3, 2),
                   (3, 3)`);

    // Imprimindo os Dados na Tela
	db.each("SELECT id, nome, cpf FROM TB_ALUNO", function(err, row) {
    	console.log(row.id + ": (" + row.nome + ", " + row.cpf + ")");
	});

	db.each("SELECT id, nome FROM TB_PROFESSOR", function(err, row) {
    	console.log(row.id + ": " + row.nome);
	});

	db.each("SELECT id, nome FROM TB_DISCIPLINA", function(err, row) {
    	console.log(row.id + ": " + row.nome);
	});

	db.each("SELECT TB_MATRICULA.id AS matricula_id, TB_ALUNO.nome AS aluno_nome, TB_DISCIPLINA.nome AS disciplina_nome, TB_PROFESSOR.nome AS professor_nome FROM TB_ALUNO, TB_DISCIPLINA, TB_PROFESSOR INNER JOIN TB_MATRICULA ON TB_ALUNO.id = TB_MATRICULA.aluno_id AND TB_DISCIPLINA.id = TB_MATRICULA.disciplina_id AND TB_PROFESSOR.id = TB_MATRICULA.professor_id", function(err, row) {
    	console.log(row.matricula_id + ": (" + row.aluno_nome + ", " + row.disciplina_nome + ", " + row.professor_nome + ")");
	});

	db.each("SELECT TB_PROFESSOR_DISCIPLINA.id AS prof_disc_id, TB_PROFESSOR.nome AS professor_nome, TB_DISCIPLINA.nome AS disciplina_nome FROM TB_PROFESSOR, TB_DISCIPLINA INNER JOIN TB_PROFESSOR_DISCIPLINA ON TB_PROFESSOR.id = TB_PROFESSOR_DISCIPLINA.professor_id AND TB_DISCIPLINA.id = TB_PROFESSOR_DISCIPLINA.disciplina_id", function(err, row) {
    	console.log(row.prof_disc_id + ": (" + row.professor_nome + ", " + row.disciplina_nome + ")");
	});
});

db.close();
