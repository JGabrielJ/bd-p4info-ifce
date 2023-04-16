/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('TB_ALUNOS').del()
  await knex('TB_ALUNOS').insert([
    { NM_AL: 'Gabriel Jacinto'},
    { NM_AL: 'Murilo Maia'},
    { NM_AL: 'Cauan de Sousa'}
  ]);
};
