'use client';
import { useState } from "react";

interface Campaign {
  id: string;
  name : string;
  startDate: string;
  endDate: string;
  cost: number;
  revenue: number;
}

const Home = () =>  {
  const baseCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Sale",
      startDate: "2026-06-01",
      endDate: "2026-06-30",
      cost: 1500,
      revenue: 3200,
    },
    {
      id: "2",
      name: "Black Friday",
      startDate: "2026-11-25",
      endDate: "2026-11-30",
      cost: 5000,
      revenue: 12000,
    },
    {
      id: "3",
      name: "New Year Campaign",
      startDate: "2026-12-28",
      endDate: "2027-01-05",
      cost: 2000,
      revenue: 4500,
    },
  ];
  
  const [campaigns, setCampaigns] = useState<Campaign[]>(baseCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(''); 
  const [userCampaign, setUserCampaign] = useState({
    name: "",
    startDate: "",
    endDate: "",
    cost: "",
    revenue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCampaign({
      ...userCampaign,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const newUserCampaign: Campaign = {
      id: Date.now().toString(),
      name: userCampaign.name,
      startDate: userCampaign.startDate,
      endDate: userCampaign.endDate,
      cost: Number(userCampaign.cost),
      revenue: Number(userCampaign.revenue),
    };

    setCampaigns([...campaigns, newUserCampaign]);

    setUserCampaign({
      name: "",
      startDate: "",
      endDate: "",
      cost: "",
      revenue: "",
    });
  };

  const handleDelete = () => {
    if (!selectedCampaign) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (confirmDelete) {
      setCampaigns(campaigns.filter((c) => c.id !== selectedCampaign));
      setSelectedCampaign('');
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Campaigns</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6"
      >
        <input
          name="name"
          value={userCampaign.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={userCampaign.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={userCampaign.endDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="cost"
          value={userCampaign.cost}
          onChange={handleChange}
          placeholder="Cost"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="revenue"
          value={userCampaign.revenue}
          onChange={handleChange}
          placeholder="Revenue"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="md:col-span-5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Add Campaign
        </button>
      </form>
      <div>
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-medium text-gray-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Profit</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCampaign(c.id)}
                  className={`border-t hover:bg-gray-50 transition ${selectedCampaign === c.id ? "bg-gray-100" : ""}`}
                >
                  <td className="px-4 py-3 cursor-pointer">{c.name}</td>
                  <td className="px-4 py-3 cursor-pointer">{c.startDate}</td>
                  <td className="px-4 py-3 cursor-pointer">{c.endDate}</td>
                  <td className="px-4 py-3 cursor-pointer">${c.cost}</td>
                  <td className="px-4 py-3 cursor-pointer">${c.revenue}</td>
                  <td className="px-4 py-3 cursor-pointer">${c.revenue - c.cost}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {selectedCampaign && (
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>

          <button
            onClick={() => setSelectedCampaign('')}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
