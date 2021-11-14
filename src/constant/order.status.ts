export enum EOrderStatus {
  REGISTER_ORDER = '注文受付中',
  CANCEL_BUY_CUSTOMER = 'キャンセル(ユーザー)',
  CANCEL_BUY_GOAW = 'キャンセル(Goaw)',
  CHECKED_PURCHASE_BILL = '明細確認依頼中',
  PUCHASED_EC = '発注中',
  PRODUCT_ARRIVED_JP_OFFICE = '納品済み',
  AGREE_FIX_PRICE = '配送明細合意済',
  UNDER_SHIPPING = '配送依頼中',
  PRODUCT_ARRIVED_VIETNAM_OFFICE = 'ベトナム配送完了',
  ASK_DELIVERY_DATE_TIME = '配達日時確認中',
  DECIED_DELIVERY_DATE_TIME = '配達日時確定済',
  PRODUCT_ARRIVED_CUTOMER_HOUSE = 'ユーザー配送完了',
  COMPLETED = '支払完了',
}
export enum EOrderType {
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  SHIP_ORDER = 'SHIP_ORDER',
}
