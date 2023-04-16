/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('TB_ALUNO_DISCIPLINA').del()
  await knex('TB_ALUNO_DISCIPLINA').insert([
    { CD_AL: 1, CD_DI: 2, PERIODO: 'P4', NOTA: 10},
    { CD_AL: 2, CD_DI: 1, PERIODO: 'P4', NOTA: 10},
    { CD_AL: 3, CD_DI: 3, PERIODO: 'P4', NOTA: 10},
  ]);
};
