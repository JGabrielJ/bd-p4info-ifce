/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('TB_DISCIPLINAS').del()
  await knex('TB_DISCIPLINAS').insert([
    { NM_DI: 'Física Eletricidade'},
    { NM_DI: 'Redes de Computadores'},
    { NM_DI: 'Programação de Dispositivos Móveis I'}
  ]);
};
