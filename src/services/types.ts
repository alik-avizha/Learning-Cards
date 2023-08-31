export type PaginatedEntity<T> = {
  pagination: Pagination
  items: T[]
}
export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export type PaginatedRequest<T> = {
  currentPage?: Pagination['currentPage']
  itemsPerPage?: Pagination['itemsPerPage']
} & T
