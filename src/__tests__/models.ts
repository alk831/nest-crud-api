import * as Models from '../models';

test('Models match table schema', async () => {
  for (const modelName in Models) {
    const modelSchema = await Models[modelName].describe();
    expect(modelSchema).toMatchInlineSnapshot(modelName);
  }
});