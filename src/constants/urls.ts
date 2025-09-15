const urls = {
  login: {
    post: '/navigator/auth',
  },
  tabs: {
    get: '/navigator/tabs',
    post: '/navigator/tabs',
    put: (id: number) => `/navigator/tabs/${id}`,
    delete: (id: number) => `/navigator/tabs/${id}`,
  },
  links: {
    get: '/navigator/links',
  },
}

export default urls
