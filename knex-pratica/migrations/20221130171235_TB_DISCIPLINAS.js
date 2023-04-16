/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('TB_DISCIPLINAS', table => {
        table.increments('CD_DI').primary()
        table.string('NM_DI').notNull().unique()
    }).then(function () {
        return knex('disciplinas').insert([
            { NM_DI: 'Banco de Dados' },
            { NM_DI: 'Matemática IV' },
            { NM_DI: 'Língua Portuguesa IV' }
        ])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('TB_DISCIPLINAS')
};
