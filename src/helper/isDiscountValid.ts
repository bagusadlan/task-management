type IsDiscountValidParamsType = {
    discountStartDate: string | null
    discountEndDate: string | null
    discountActive: boolean
  }
  
  export function isDiscountValid({
    discountStartDate,
    discountEndDate,
    discountActive
  }: IsDiscountValidParamsType): boolean {
    if (!discountActive) {
      return false
    }
  
    const now = new Date()
  
    if (discountStartDate && discountEndDate) {
      const startDate = new Date(discountStartDate)
      const endDate = new Date(discountEndDate)
  
      return now >= startDate && now <= endDate
    }
  
    return false
  }
  