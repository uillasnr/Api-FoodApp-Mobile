import repositoryBanner from "../repositories/repositoryBanner.js";


async function List() {
  
  const banners = await repositoryBanner.List();
  return banners;
}

export default { List };
