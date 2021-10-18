import { Router } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request, response) => {
  const { name, description } = request.body;
  categoriesRepository.create({ name, description });

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: 'Category Already Exists' });
  }

  return response.status(201).send();
});

categoriesRouter.get('/', (_, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRouter };
