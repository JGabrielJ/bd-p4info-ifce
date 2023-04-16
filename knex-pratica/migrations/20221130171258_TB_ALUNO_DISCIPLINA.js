/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('TB_ALUNO_DISCIPLINA', table => {
        table.integer('CD_AL').unsigned()
        table.integer('CD_DI').unsigned()

        table.string('PERIODO').notNull()
        table.integer('NOTA').notNull()

        table.primary(['CD_AL', 'CD_DI'])
        table.foreign('CD_AL').references('TB_ALUNOS.CD_AL')
        table.foreign('CD_DI').references('TB_DISCIPLINAS.CD_DI')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('TB_ALUNO_DISCIPLINA')
};
