declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

function pushToDataLayer(eventData: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(eventData)
}

/**
 * 注册成功事件
 *
 * 触发时机：
 * 用户真正注册成功后触发。
 * 不要在点击注册按钮时触发。
 */
export function trackSignUp(method: 'email' | 'google' | 'github' = 'email') {
  pushToDataLayer({
    event: 'sign_up',
    method,
  })
}

/**
 * 点击付费按钮 / 开始支付流程事件
 *
 * 触发时机：
 * 用户点击 Pay / Buy / Recharge / Subscribe 按钮，
 * 并开始进入支付流程时触发。
 *
 * 注意：
 * begin_checkout 只代表用户有付费意向，
 * 不代表支付成功。
 */
export function trackBeginCheckout(params: {
  itemId: string
  itemName: string
  value: number
  currency?: string
}) {
  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: params.currency || 'USD',
      value: params.value,
      items: [
        {
          item_id: params.itemId,
          item_name: params.itemName,
          price: params.value,
          quantity: 1,
        },
      ],
    },
  })
}

/**
 * 支付成功事件
 *
 * 触发时机：
 * 必须在真实支付成功后触发。
 *
 * 正确触发条件：
 * - 支付平台确认成功；
 * - 后端订单状态为 paid；
 * - 充值到账成功；
 * - 订阅创建成功。
 *
 * 不要在点击支付按钮、创建订单、跳转支付页时触发。
 */
export function trackPurchase(params: {
  transactionId: string
  itemId: string
  itemName: string
  value: number
  currency?: string
}) {
  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: params.transactionId,
      currency: params.currency || 'USD',
      value: params.value,
      items: [
        {
          item_id: params.itemId,
          item_name: params.itemName,
          price: params.value,
          quantity: 1,
        },
      ],
    },
  })
}
