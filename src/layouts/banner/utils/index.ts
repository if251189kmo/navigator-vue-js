import { Bannerss } from 'src/constants/banners'
import { ServerStatuses } from 'src/constants/serverStatuses'
import type { BannerUi } from 'src/models/banner'
import { errors } from '../json/index.json'
import { useLoginStore } from 'src/stores/login'

const { INTERNAL_SERVER, UNAUTHORIZED } = ServerStatuses
const { ERROR, WARNING, SUCCESS, INFO } = Bannerss
const { NO_STATUS } = ServerStatuses

type SingeltonBanner = {
  status: BannerUi['status']
  statusType: BannerUi['statusType']
  message?: BannerUi['message']
}

const getBannerType = (status: BannerUi['status']) => {
  const isInfo = status >= 100 && status < 200
  const isSuccess = status >= 200 && status < 300
  const isWarning = status >= 301 && status < 400

  if (isInfo) return INFO
  else if (isWarning) return WARNING
  else if (isSuccess) return SUCCESS
  else return ERROR
}

const getBannerMessage = ({ message, statusType }: SingeltonBanner) => {
  const loginStore = useLoginStore()

  if (message) return message
  if (statusType === INTERNAL_SERVER) return errors.internalServer
  if (statusType === UNAUTHORIZED) {
    loginStore.logout()

    return errors.unauthorized
  } else return ''
}

const singeltonBanner = (props: SingeltonBanner) => {
  const { status, statusType = NO_STATUS } = props

  return {
    status,
    statusType,
    type: getBannerType(status),
    message: getBannerMessage(props),
  }
}

// TODO: Замінити змінними
const getIconConfig = (type: Bannerss) => {
  switch (type) {
    case ERROR:
      return { name: 'error', bg: '#f44336' }
    case WARNING:
      return { name: 'warning', bg: '#ff9800' }
    case SUCCESS:
      return { name: 'check_circle', bg: '#4caf50' }
    case INFO:
      return { name: 'info', bg: '#2196f3' }
    default:
      return { name: 'help', bg: '#9e9e9e' }
  }
}

export { singeltonBanner, getIconConfig }
