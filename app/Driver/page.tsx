"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import FormField from "@/components/FormField";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function FleetVehicleListPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"vehicles" | "drivers">("vehicles");

  /* ==========================
      PERSIST ACTIVE TAB
  =========================== */
  useEffect(() => {
    const saved = localStorage.getItem("fleet-active-tab");
    if (saved === "vehicles" || saved === "drivers") {
      setActiveTab(saved);
    }
  }, []);

  const changeTab = (tab: "vehicles" | "drivers") => {
    setActiveTab(tab);
    localStorage.setItem("fleet-active-tab", tab);
  };

  /* ==========================
      MOCK DATA
  =========================== */
  const vehicles = [
    {
      id: 1,
      name: "TN 38 AB 1234",
      image: "/fleet/vehicle1.png",
      account: "Eicher Pro 2049",
      job: "Arun Kumar",
      email: "Coimbatore → Salem",
      mobile: "Diesel",
      status: "Active",
      tags: ["On Duty"],
    },
    {
      id: 2,
      name: "TN 66 CA 9023",
      image: "/fleet/vehicle2.png",
      account: "Ashok Leyland Dost",
      job: "Prakash",
      email: "Erode → Tiruppur",
      mobile: "Diesel",
      status: "Idle",
      tags: ["Available"],
    },
    {
      id: 3,
      name: "TN 45 BD 7721",
      image: "/fleet/vehicle3.png",
      account: "Tata ACE Mini Truck",
      job: "Suresh",
      email: "Madurai → Dindigul",
      mobile: "Petrol",
      status: "Maintenance",
      tags: ["Workshop"],
    },
  ];

  const drivers = [
    {
      id: 1,
      name: "Arun Kumar",
      image: "https://i.pravatar.cc/40?img=5",
      phone: "+91 9876543210",
      vehicle: "TN 38 AB 1234",
      license: "12 Sep 2026",
      status: "Active",
      tags: ["Experienced"],
    },
    {
      id: 2,
      name: "Prakash",
      image: "https://i.pravatar.cc/40?img=11",
      phone: "+91 8765432109",
      vehicle: "TN 66 CA 9023",
      license: "04 Feb 2027",
      status: "On Leave",
      tags: ["Backup Driver"],
    },
    {
      id: 3,
      name: "Suresh",
      image: "https://i.pravatar.cc/40?img=9",
      phone: "+91 8123456789",
      vehicle: "TN 45 BD 7721",
      license: "20 Jul 2025",
      status: "Active",
      tags: ["Heavy License"],
    },
  ];

  /* ==========================
      STATUS BADGE COMPONENT
  =========================== */
  const StatusBadge = ({ text }: { text: string }) => {
    let color = "#6B7280";
    if (text === "Active") color = "#16A34A";
    if (text === "Idle") color = "#F59E0B";
    if (text === "Maintenance") color = "#DC2626";
    if (text === "On Duty") color = "#2563EB";

    return (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          background: "#F6F7F9",
          fontSize: "12px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        ></span>
        {text}
      </span>
    );
  };

  /* ==========================
      TAG BADGE COMPONENT
  =========================== */
  const TagBadge = ({ text }: { text: string }) => {
    let bg = "#6366F1";
    if (text === "On Duty") bg = "#2563EB";
    if (text === "Available") bg = "#16A34A";
    if (text === "Workshop") bg = "#DC2626";
    if (text === "Experienced") bg = "#7C3AED";
    if (text === "Backup Driver") bg = "#D97706";
    if (text === "Heavy License") bg = "#0EA5E9";

    return (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "16px",
          fontSize: "12px",
          color: "white",
          background: bg,
          marginRight: "6px",
        }}
      >
        {text}
      </span>
    );
  };

  /* ==========================
      MAIN RETURN
  =========================== */
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />

        <div className="fleet-page">

          {/* ========================== TABS ========================== */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <button className={activeTab === "vehicles" ? "tab-active" : "tab"} onClick={() => changeTab("vehicles")}>
              Vehicle List
            </button>
            <button className={activeTab === "drivers" ? "tab-active" : "tab"} onClick={() => changeTab("drivers")}>
              Driver List
            </button>

            <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
              <button className="toolbar-btn">Customize table ▼</button>

              {activeTab === "vehicles" ? (
                <>
                  <button className="toolbar-btn">Import vehicles ▼</button>
                  <button className="btn-primary">+ Add Vehicle</button>
                </>
              ) : (
                <>
                  <button className="toolbar-btn">Import drivers ▼</button>
                  <button className="btn-primary">+ Add Driver</button>
                </>
              )}
            </div>
          </div>

          {/* ========================== FILTER BAR ========================== */}
          <div className="card" style={{ padding: "12px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "20px" }}>
            <button className="toolbar-btn">Table ▼</button>
            <button className="toolbar-btn">Bulk actions</button>

            <div style={{ width: "260px" }}>
              <FormField
                type="text"
                placeholder={activeTab === "vehicles" ? "Search vehicles..." : "Search drivers..."}
                value={search}
                onChange={setSearch}
              />
            </div>
          </div>

          {/* ========================== TABLE ========================== */}
          <div className="fleet-table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "40px", textAlign: "center" }}>
                    <input type="checkbox" className="fleet-checkbox" />
                  </th>

                  {activeTab === "vehicles" ? (
                    <>
                      <th>Vehicle Number</th>
                      <th>Model</th>
                      <th>Assigned Driver</th>
                      <th>Last Trip</th>
                      <th>Fuel</th>
                      <th>Status</th>
                      <th>Tags</th>
                    </>
                  ) : (
                    <>
                      <th>Driver Name</th>
                      <th>Photo</th>
                      <th>Phone</th>
                      <th>Assigned Vehicle</th>
                      <th>License Expiry</th>
                      <th>Status</th>
                      <th>Tags</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody key={activeTab} className="fade-in">
                {activeTab === "vehicles"
                  ? vehicles.map((row) => (
                      <tr key={row.id}>
                        <td><input type="checkbox" className="fleet-checkbox" /></td>

                        <td>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <Image src={row.image} alt="vehicle" width={32} height={32} style={{ borderRadius: "50%" }} />
                            {row.name}
                          </div>
                        </td>

                        <td>{row.account}</td>
                        <td>{row.job}</td>
                        <td>{row.email}</td>
                        <td>{row.mobile}</td>
                        <td><StatusBadge text={row.status} /></td>
                        <td>{row.tags.map((t) => <TagBadge key={t} text={t} />)}</td>
                      </tr>
                    ))
                  : drivers.map((row) => (
                      <tr key={row.id} className="driver-crm-row">

                        {/* Checkbox */}
                        <td><input type="checkbox" className="fleet-checkbox" /></td>

                        {/* DRIVER NAME */}
                        <td className="driver-crm-cell">{row.name}</td>

                        {/* PHOTO */}
                        <td className="driver-crm-cell driver-crm-photo">
                          <Image
                            src={row.image}
                            alt="driver"
                            width={34}
                            height={34}
                            style={{ borderRadius: "50%" }}
                          />
                        </td>

                        {/* PHONE */}
                        <td className="driver-crm-cell">{row.phone}</td>

                        {/* OTHER CELLS */}
                        <td>{row.vehicle}</td>
                        <td>{row.license}</td>
                        <td><StatusBadge text={row.status} /></td>
                        <td>{row.tags.map((t) => <TagBadge key={t} text={t} />)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* ========================== PAGINATION ========================== */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px" }}>
            <p>Showing 1–10 of 10</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="toolbar-btn">&lt;</button>
              <button className="btn-primary">1</button>
              <button className="toolbar-btn">&gt;</button>
            </div>

            <p style={{ color: "var(--text-secondary)" }}>Showing 25 per page</p>
          </div>

        </div>
      </div>
    </div>
  );
}