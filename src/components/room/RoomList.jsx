import React, { useState } from "react";
import { motion } from "framer-motion";
import RoomCard from "./RoomCard";
import RoomDetails from "./RoomDetails";

function RoomList() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Iron Man themed mock room data
  const mockRooms = [
    {
      id: 1,
      name: 'Signature Guest Room',
      price: 2130.40,
      image: '/api/placeholder/400/300',
      description: 'Unwind in a thoughtfully designed space featuring plush bedding, curated amenities, and just the right touch of elegance for a restful stay.',
      features: ['Climate Control', 'Foam Mattress', 'Convertible beds', 'Smart Lock', 'Fast WiFi'],
      available: 5
    },
    {
      id: 2,
      name: 'Arc Reactor Suite',
      price: 3500.00,
      image: '/api/placeholder/400/300',
      description: 'Experience luxury in our premium suite with panoramic city views and cutting-edge technology inspired by Stark Industries.',
      features: ['City View', 'King Bed', 'Mini Bar', 'Smart Home', 'Premium WiFi', 'Holographic Display'],
      available: 2
    },
    {
      id: 3,
      name: 'Mark 85 Presidential',
      price: 5200.75,
      image: '/api/placeholder/400/300',
      description: 'The ultimate luxury experience with personalized service and exclusive amenities fit for a superhero.',
      features: ['Ocean View', 'Butler Service', 'Private Balcony', 'Jacuzzi', 'Premium Everything', 'AI Assistant'],
      available: 1
    }
  ];

  const handleBookNow = (roomId) => {
    console.log('Booking room:', roomId);
    // Add booking logic here
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.h3 
        className="text-3xl font-bold text-yellow-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Results based on your preferences
      </motion.h3>
      
      <div className="space-y-8">
        {mockRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <RoomCard
              image={room.image}
              name={room.name}
              description={room.description}
              price={room.price.toFixed(2)}
              features={room.features}
              available={room.available}
              onBookNow={() => handleBookNow(room.id)}
              onViewDetails={() => handleViewDetails(room)}
            />
          </motion.div>
        ))}
      </div>

      {/* Room Details Modal */}
      <RoomDetails 
        room={selectedRoom}
        isOpen={isDetailsOpen}
        onClose={closeDetails}
      />
    </div>
  );
}

export default RoomList;