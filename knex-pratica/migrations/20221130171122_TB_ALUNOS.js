/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('TB_ALUNOS', table => {
        table.increments('CD_AL').primary()
        table.string('NM_AL').notNull().unique()
    }).then(function () {
        return knex('alunos').insert([
            { NM_AL: 'João Gabriel' },
            { NM_AL: 'Murilo Rodrigues' },
            { NM_AL: 'Pedro Cauan' }
        ])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('TB_ALUNOS')
};
