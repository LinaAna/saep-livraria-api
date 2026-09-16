import { AppDataSource } from '../../src/db/dataSource';
import { Editora } from '../../src/models/editora';
import { resetarBanco, fecharBanco } from '../helpers/db';

beforeAll(async () => {
  await resetarBanco();
});

afterAll(async () => {
  await fecharBanco();
});

describe('Testando model editora', () => {
  const objetoEditora = {
    nome: 'Vozes',
    cidade: 'Petrópolis',
    email: 'contato@vozes.com.br',
  };

  test('Deve instanciar uma nova editora', () => {
    const editora = Object.assign(new Editora(), objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  test('Deve salvar editora no banco', async () => {
    const dados = await AppDataSource.getRepository(Editora).save({
      ...objetoEditora,
    });

    expect(dados.nome).toBe('Vozes');
    expect(dados.id).toBeDefined();
  });

  test('Deve deletar registro a partir do id', async () => {
    const repo = AppDataSource.getRepository(Editora);
    const salvo = await repo.save({ ...objetoEditora });
    const resultado = await repo.delete(salvo.id);

    expect(resultado.affected).toBe(1);
  });

  test.todo('Deve fazer uma chamada simulada ao db');
});