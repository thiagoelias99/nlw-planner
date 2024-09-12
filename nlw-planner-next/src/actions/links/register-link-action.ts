export interface RegisterLinkDto {
  title: string
  url: string
  userName: string
}

export async function registerLinkAction(data: RegisterLinkDto) {
  console.log('registerLinkAction', data)
}