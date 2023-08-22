import { toast } from 'react-toastify'

export function useMutationWithToast() {
  return async (mutationResult: Promise<any>, message: string) => {
    try {
      const result = await mutationResult

      if ('data' in result) {
        toast.success(message)

        return { success: true, data: result.data }
      } else if ('error' in result) {
        if (result.error.data && result.error.data.errorMessages) {
          result.error.data.errorMessages.forEach((el: any) => {
            toast.error(el.message)
          })
        } else {
          toast.error('An error occurred')
        }

        return { success: false, error: result.error }
      }
    } catch (error) {
      toast.error('An error occurred')

      return { success: false, error }
    }
  }
}
