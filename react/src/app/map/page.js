import React from 'react';
import { MapPin } from 'lucide-react';
import Map from '@/component/map';

function TestMap() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <MapPin className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-3xl font-bold text-white">Interactive Map Explorer</h1>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="h-[600px]">
            <Map />
          </div>
          <div className="mt-4 text-gray-300 text-center">
            <p>Explore the map by dragging and zooming. Click on points of interest to learn more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestMap;