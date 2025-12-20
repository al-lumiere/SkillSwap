export type HeaderUIProps =
  | { variant: 'full'; isUserAuth: boolean; userName?: string }
  | { variant: 'compact'; onCloseClick: () => void };

// varian full - когда нужно отрисовать полный хедер с навигацией, сёрчем и кнопками/юзером
// variant compact для страниц регистрации и логина
