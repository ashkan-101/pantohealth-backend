import { PaginationDTO } from "../dtos/pagination.dto"

export function paginationSolver(pagination: PaginationDTO){
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 100;

  let page = Number(pagination.page)
  let limit = Number(pagination.limit)

  if(!page || page < 1 || isNaN(page)){
    page = DEFAULT_PAGE
  }else {
    page = Math.floor(page)
  }
  
  if(!limit || limit <= 0 || isNaN(limit)){
    limit = DEFAULT_LIMIT
  }else {
    limit = Math.floor(limit)
  }

  if(limit > MAX_LIMIT){
    limit = MAX_LIMIT
  }

  const skip = (page - 1 ) * limit

  return {
    page,
    limit,
    skip
  }
}

export function paginationGenerator(count: number , page: number , limit: number) {
  const totalPage = Math.ceil(count / limit)

  return {
      totalPage: totalPage,
      totalCount: count,
      page: +page,
      limit: +limit,
      next: page < totalPage,
      back: page > 1
  }
}