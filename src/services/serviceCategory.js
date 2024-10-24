import repositoryCategory from "../repositories/repositoryCategory.js";

async function List() {
  
  const category = await repositoryCategory.List();
  return category;
}

export default { List };
