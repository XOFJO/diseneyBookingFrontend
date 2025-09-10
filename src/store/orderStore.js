import { create } from "zustand";

const useOrderStore = create((set) => ({
  // 筛选状态
  activeFilter: 'ALL',
  
  // 订单数据
  orders: [],
  
  // loading状态
  loading: false,
  error: null,

  // 设置筛选条件
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  
  // 设置订单数据
  setOrders: (orders) => set({ orders }),
  
  // 设置loading状态
  setLoading: (loading) => set({ loading }),
  
  // 设置错误状态
  setError: (error) => set({ error }),
  
  // 获取筛选后的订单
  getFilteredOrders: (orders, filter) => {
    if (filter === 'ALL') return orders;
    return orders.filter(order => order.status === filter);
  }
}));

export default useOrderStore;
