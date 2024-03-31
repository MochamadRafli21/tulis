export type responseData<T> = {
  errors: Record<keyof T, string> | undefined
  message: string
  data: T
}
