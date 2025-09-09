/**
 * 计算房间预订价格明细
 * @param {Array} roomPriceList - 房间每日价格列表 [{date: '2025-09-09', price: 1360}, ...]
 * @param {string} startDate - 入住日期 (YYYY-MM-DD)
 * @param {string} endDate - 离店日期 (YYYY-MM-DD)
 * @param {number} roomCount - 房间数量
 * @returns {Object} 价格明细和总价
 */
export function calculatePriceDetail(roomPriceList, startDate, endDate, roomCount) {
  if (!roomPriceList || !startDate || !endDate || !roomCount) {
    return { detail: [], totalPrice: 0 };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const detail = [];
  
  // 遍历每一天（不包括离店日期）
  for (let date = new Date(start); date < end; date.setDate(date.getDate() + 1)) {
    const dateStr = date.toISOString().split('T')[0];
    
    // 查找当日价格
    const dayPrice = roomPriceList.find(item => item.date === dateStr);
    if (dayPrice) {
      detail.push({
        date: dateStr,
        price: dayPrice.price,
        roomCount: roomCount,
        total: dayPrice.price * roomCount
      });
    }
  }

  // 计算总价
  const totalPrice = detail.reduce((sum, item) => sum + item.total, 0);

  return { detail, totalPrice };
}

/**
 * 格式化日期显示
 * @param {string} dateStr - 日期字符串 (YYYY-MM-DD)
 * @returns {string} 格式化后的日期 (MM月DD日)
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

/**
 * 格式化价格显示
 * @param {number} price - 价格
 * @returns {string} 格式化后的价格字符串
 */
export function formatPrice(price) {
  return `¥${price.toLocaleString()}`;
}
