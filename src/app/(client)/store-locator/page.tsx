"use client";
import { Input } from "@/components/ui/input";
import Header from "../_component/Header";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWarehouseByPostcode } from "@/http/api";
import { SearchIcon , MapPin} from "lucide-react";

export default function StoreLocatorPage() {
  const [postcode, setPostCode] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const { data: warehouse , isLoading } = useQuery({
    queryKey: ["postcodeByWarehouse"],
    queryFn: () => getWarehouseByPostcode(postcode),
  });

  const  handleSearch = (e: any) => {
    if (warehouse?.length) {
      setSelectedWarehouse(warehouse[0]); 
    } else {
      alert("No warehouse found for this postcode.");
    }
  };
  return (
    <div>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Store Locator
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-11 max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:items-start  w-full md:w-1/2">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Enter your postcode"
                value={postcode}
                onChange={(e) => setPostCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-brown-500"
              />
              <button
                className="w-[100px] flex justify-center px-4 py-2 font-medium text-white bg-brown-600 rounded-md hover:bg-brown-500 focus:outline-none"
                onClick={handleSearch}
              >
                <SearchIcon/>
              </button>
            </div>
            <div className="mt-3 py-10">
              {warehouse && (
                <ul>
                  {warehouse.map((warehouse: any) => (
                    <li key={warehouse.id}>
                      <div className=" flex space-x-2 p-5 border">
                        <MapPin />
                        <h2 className="font-bold">{warehouse.name}</h2>
                        <p className="font-sans">{warehouse.pincode}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-[500px] h-[600px] md:w-2/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15043038.466636408!2d80.47592336038588!3d23.001114142974515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1732672717618!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="rounded-lg shadow-md border border-gray-300"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
