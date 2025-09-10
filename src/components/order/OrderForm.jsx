import React from 'react';
import OrderFilter from './OrderFilter';
import OrderList from './OrderList';
import HotelDetailHeader from '../room/HotelDetailHeader';
import DisneyBackground from '../common/DisneyBackground';

function OrderForm() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Header */}
            <HotelDetailHeader />
            
            {/* 迪士尼星空背景 */}
            <DisneyBackground />
            
            {/* Main Content - adjusted for header height */}
            <div className="relative z-10 p-4 flex flex-col items-center justify-start min-h-screen pt-24">
                <div className="w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
                    {/* Filter Component */}
                    <OrderFilter />
                    
                    {/* Order List Component */}
                    <OrderList />
                </div>
            </div>
        </div>
    );
}

export default OrderForm;   