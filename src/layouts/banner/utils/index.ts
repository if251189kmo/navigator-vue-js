import { Bannerss } from 'src/constants/banners'
import { ServerStatuses } from 'src/constants/serverStatuses'
import type { BannerUi } from 'src/models/banner'

const { ERROR, WARNING, SUCCESS, INFO } = Bannerss
const { NO_STATUS } = ServerStatuses

type SingeltonBanner = {
  status: BannerUi['status']
  statusType: BannerUi['statusType']
  message?: BannerUi['message']
}

const getBannerType = (status: BannerUi['status']) => {
  const isInfo = status >= 100 && status < 200
  const isWarning = status >= 301 && status < 400
  const isError = status >= 400 && status < 500

  if (isInfo) return INFO
  else if (isError) return ERROR
  else if (isWarning) return WARNING
  else return SUCCESS
}

const singeltonBanner = ({ status, statusType = NO_STATUS, message = '' }: SingeltonBanner) => {
  return {
    status,
    statusType,
    type: getBannerType(status),
    message,
  }
}

export { singeltonBanner }
